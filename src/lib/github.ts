import { db } from "@/server/db";
import { Octokit } from "octokit";
import axios from "axios";
import { aiSummarizeCommit } from "./gemini";

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

type CommitInfo = {
  commitHash: string;
  commitMessage: string;
  commitAuthorName: string;
  commitAuthorAvatar: string;
  commitDate: string;
};

export const getLatestCommits = async (
  githubUrl: string,
): Promise<CommitInfo[]> => {
  const [owner, repo] = githubUrl.split("/").slice(-2);

  if (!owner || !repo) throw new Error("Invalid GitHub URL");

  const { data } = await octokit.rest.repos.listCommits({
    owner,
    repo,
  });

  return data
    .sort(
      (a, b) =>
        new Date(b.commit.author?.date || 0).getTime() -
        new Date(a.commit.author?.date || 0).getTime(),
    )
    .slice(0, 10)
    .map((commit) => ({
      commitHash: commit.sha,
      commitMessage: commit.commit.message,
      commitAuthorName: commit.commit.author?.name || "Unknown",
      commitAuthorAvatar: commit.author?.avatar_url || "",
      commitDate: commit.commit.author?.date || new Date().toISOString(),
    }));
};

export const pollCommits = async (projectId: string) => {
  const { githubUrl } = await fetchProjectGithubUrl(projectId);
  const latestCommits = await getLatestCommits(githubUrl);
  const unprocessedCommits = await filterUnprocessedCommits(
    projectId,
    latestCommits,
  );

  const summaries = await Promise.allSettled(
    unprocessedCommits.map(
      async (commit) => await summarizeCommitDiff(githubUrl, commit.commitHash),
    ),
  );

  const commitSummaries = summaries.map((result, index) =>
    result.status === "fulfilled" ? result.value : "",
  );

  const savedCommits = await db.commit.createMany({
    data: unprocessedCommits.map((commit, index) => ({
      projectId,
      commitHash: commit.commitHash,
      commitMessage: commit.commitMessage,
      commitAuthorName: commit.commitAuthorName,
      commitAuthorAvatar: commit.commitAuthorAvatar,
      commitDate: commit.commitDate,
      summary: commitSummaries[index] ?? "",
    })),
  });

  return savedCommits;
};

async function summarizeCommitDiff(
  githubUrl: string,
  commitHash: string,
): Promise<string> {
  try {
    const { data } = await axios.get(`${githubUrl}/commit/${commitHash}.diff`, {
      headers: { Accept: "application/vnd.github.v3.diff" },
    });
    return await aiSummarizeCommit(data);
  } catch (error) {
    console.error(`Error summarizing commit ${commitHash}:`, error);
    return "";
  }
}

async function fetchProjectGithubUrl(projectId: string) {
  const project = await db.project.findFirst({ where: { id: projectId } });
  if (!project) throw new Error("Project not found");
  return { project, githubUrl: project.githubUrl };
}

async function filterUnprocessedCommits(
  projectId: string,
  commits: CommitInfo[],
): Promise<CommitInfo[]> {
  const existing = await db.commit.findMany({ where: { projectId } });
  const processedHashes = new Set(existing.map((commit) => commit.commitHash));
  return commits.filter((commit) => !processedHashes.has(commit.commitHash));
}
