import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { Document } from "@langchain/core/documents";
import { generateEmbedding, summarizeCode } from "./gemini";
import { db } from "@/server/db";
import { Octokit } from "octokit";

// Progress callback type for indexing
export type IndexProgressCallback = (progress: {
  processed: number;
  total: number;
  status: "PROCESSING" | "READY" | "FAILED";
  error?: string;
}) => Promise<void>;
export const loadGithubRepo = async (
  githubUrl: string,
  githubToken?: string,
) => {
  const loader = new GithubRepoLoader(githubUrl, {
    accessToken: githubToken || "",
    branch: "main",
    ignoreFiles: [
      "pacakage-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      "bun.lockb",
    ],
    recursive: true,
    unknown: "warn",
    maxConcurrency: 5,
  });
  const docs = await loader.load();
  return docs;
};

const getFileCount = async (
  path: string,
  octokit: Octokit,
  githubOwner: string,
  githubRepo: string,
  acc = 0,
) => {
  const { data } = await octokit.rest.repos.getContent({
    owner: githubOwner,
    repo: githubRepo,
    path,
  });
  if (!Array.isArray(data) && data.type === "file") {
    return acc + 1;
  }
  if (Array.isArray(data)) {
    let fileCount = 0;
    const directories: string[] = [];
    for (const item of data) {
      if (item.type === "dir") {
        directories.push(item.path);
      } else {
        fileCount += 1;
      }
    }
    if (directories.length > 0) {
      const directoryCounts = await Promise.all(
        directories.map((dirPath) =>
          getFileCount(dirPath, octokit, githubOwner, githubRepo, 0),
        ),
      );
      fileCount += directoryCounts.reduce((acc, count) => acc + count, 0);
    }
    return (acc += fileCount);
  }
  return acc;
};

// More efficient method using Git Tree API (single API call)
const getFileCountEfficient = async (
  octokit: Octokit,
  githubOwner: string,
  githubRepo: string,
): Promise<number> => {
  try {
    const { data } = await octokit.rest.git.getTree({
      owner: githubOwner,
      repo: githubRepo,
      tree_sha: "HEAD",
      recursive: "true",
    });

    // Count only files (blobs), not trees
    return data.tree.filter((item) => item.type === "blob").length;
  } catch {
    // Fallback to recursive method if tree API fails
    return getFileCount("", octokit, githubOwner, githubRepo, 0);
  }
};

export const checkCredits = async (githubUrl: string, githubToken?: string) => {
  const octokit = new Octokit({
    auth: githubToken,
  });
  const githubOwner = githubUrl.split("/")[3];
  const githubRepo = githubUrl.split("/")[4];
  if (!githubOwner || !githubRepo) return 0;
  // Use efficient tree API (1 API call instead of N calls per directory)
  const fileCount = await getFileCountEfficient(octokit, githubOwner, githubRepo);
  return fileCount;
};

export const indexGithubRepo = async (
  projectId: string,
  githubUrl: string,
  githubToken?: string,
  onProgress?: IndexProgressCallback,
) => {
  try {
    // Load GitHub repository
    const docs = await loadGithubRepo(githubUrl, githubToken);

    // Update total file count
    if (onProgress) {
      await onProgress({
        processed: 0,
        total: docs.length,
        status: "PROCESSING",
      });
    }

    // Generate embeddings and save to database with progress tracking
    const BATCH_SIZE = 5;
    for (let i = 0; i < docs.length; i += BATCH_SIZE) {
      const batch = docs.slice(i, i + BATCH_SIZE);
      const allEmbeddings = await generateEmbeddings(batch);

      await Promise.allSettled(
        allEmbeddings.map(async (embedding) => {
          if (!embedding) return;
          const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
            data: {
              summary: embedding.summary,
              sourceCode: embedding.sourceCode,
              fileName: embedding.fileName,
              projectId,
            },
          });
          await db.$executeRaw`
          UPDATE "SourceCodeEmbedding"
          SET "summaryEmbedding" = ${embedding.embedding}::vector
          WHERE id = ${sourceCodeEmbedding.id}
          `;
        }),
      );

      // Update progress
      const processed = Math.min(i + BATCH_SIZE, docs.length);
      if (onProgress) {
        await onProgress({
          processed,
          total: docs.length,
          status: "PROCESSING",
        });
      }
    }

    // Mark as complete
    if (onProgress) {
      await onProgress({
        processed: docs.length,
        total: docs.length,
        status: "READY",
      });
    }

    return { success: true, fileCount: docs.length };
  } catch (error) {
    if (onProgress) {
      await onProgress({
        processed: 0,
        total: 0,
        status: "FAILED",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
    throw error;
  }
};

const generateEmbeddings = async (docs: Document[]) => {
  return await Promise.all(
    docs.map(async (doc) => {
      const summary = await summarizeCode(doc);
      const embedding = await generateEmbedding(summary);
      return {
        summary,
        embedding,
        sourceCode: JSON.stringify(doc.pageContent),
        fileName: doc.metadata.source,
      };
    }),
  );
};
