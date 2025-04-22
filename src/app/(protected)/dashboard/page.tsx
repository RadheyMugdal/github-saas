"use client";
import { useProject } from "@/hooks/useProject";
import { useUser } from "@clerk/nextjs";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  const { project } = useProject();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        {/* Github link  */}
        <div className="bg-primary w-fit rounded-md px-4 py-3">
          <div className="flex items-center">
            <Github className="size-6 text-white" />
            <p className="text-sm font-medium text-white">
              This project is linked to{" "}
              {/* <Link
                href={project?.githubUrl as string}
                className="inline-flex items-center text-white/80 hover:underline"
              >
                {project?.githubUrl}
                <ExternalLink className="ml-1 size-5" />
              </Link> */}
            </p>
          </div>
        </div>
        <div className="h-4"></div>
        <div className="flex items-center gap-4">
          TeamMembers InviteButton ArchiveButton
        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          AskQuestionCard MeetingCard
        </div>
        <div className="mt-8"></div>
        Commit log
      </div>
    </div>
  );
};

export default DashboardPage;
