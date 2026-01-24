import { inngest } from "../client";
import { indexGithubRepo } from "@/lib/github-loader";
import { db } from "@/server/db";
import { pollCommits } from "@/lib/github";

export const indexRepoJob = inngest.createFunction(
  { id: "index-github-repo" },
  { event: "repo/index" },
  async ({ event, step }) => {
    const { projectId, githubUrl, githubToken } = event.data;

    // Step 1: Update status to PROCESSING
    await step.run("update-status-to-processing", async () => {
      await db.project.update({
        where: { id: projectId },
        data: {
          indexStatus: "PROCESSING",
          indexProgress: 0,
          processedFiles: 0,
          indexError: null,
        },
      });
    });

    // Step 2: Index the repository with progress tracking
    const result = await step.run("index-repository", async () => {
      return await indexGithubRepo(
        projectId,
        githubUrl,
        githubToken,
        async (progress) => {
          // Update progress in database
          await db.project.update({
            where: { id: projectId },
            data: {
              indexProgress: Math.floor((progress.processed / progress.total) * 100),
              processedFiles: progress.processed,
              totalFiles: progress.total,
              indexStatus: progress.status,
              ...(progress.error ? { indexError: progress.error } : {}),
            },
          });
        },
      );
    });

    // Step 3: Poll commits after indexing is complete
    await step.run("poll-commits", async () => {
      await pollCommits(projectId);
    });

    // Step 4: Mark as READY and deduct credits
    await step.run("mark-complete", async () => {
      const project = await db.project.findUnique({
        where: { id: projectId },
        select: { userToProject: { select: { userId: true } } },
      });

      if (project?.userToProject[0]) {
        await db.user.update({
          where: { id: project.userToProject[0].userId },
          data: {
            credits: { decrement: result.fileCount || 0 },
          },
        });
      }

      await db.project.update({
        where: { id: projectId },
        data: {
          indexStatus: "READY",
          indexProgress: 100,
        },
      });
    });

    return {
      success: true,
      projectId,
      fileCount: result.fileCount,
    };
  },
);

// Handle failed indexing jobs
export const indexRepoFailedJob = inngest.createFunction(
  { id: "index-github-repo-failed" },
  { event: "inngest/function.failed" },
  async ({ event, step }) => {
    // Only handle failures from our index job
    if (event.data.function_id !== "index-github-repo") {
      return { ignored: true };
    }

    const eventId = event.data.event_id;

    await step.run("mark-as-failed", async () => {
      // Extract projectId from the original event data
      const originalEvent = event.data.event.data;
      const projectId = originalEvent.projectId;

      await db.project.update({
        where: { id: projectId },
        data: {
          indexStatus: "FAILED",
          indexError: "Indexing job failed. Please try again.",
        },
      });
    });

    return { handled: true };
  },
);
