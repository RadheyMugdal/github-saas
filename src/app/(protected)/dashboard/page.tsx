"use client";
import { useProject } from "@/hooks/useProject";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import React from "react";
import CommitLog from "./commit-log";
import AskQuestionCard from "./ask-question-card";
import MeetingCard from "./meeting-card";
import ArchiveButton from "./archive-button";
import InviteButton from "./invite-button";
import TeamMembers from "./team-members";

const DashboardPage = () => {
  const { project } = useProject();
  if (!project) {
    return (
      <div className="flex h-full items-center justify-center gap-12">
        <p className="text-muted-foreground text-sm">
          No project found. Please create a project.
        </p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        {/* Github link  */}
        <div className="bg-muted text-muted-foreground w-fit rounded-md px-4 py-3">
          <div className="flex items-center gap-2">
            <Github className="size-4" />
            <p className="text-sm font-medium">
              This project is linked to{" "}
              <Link
                href={project!.githubUrl}
                className="inline-flex items-center hover:underline"
              >
                {project?.githubUrl}
                <ExternalLink className="mt-0.5 ml-1 size-4" />
              </Link>
            </p>
          </div>
        </div>
        <div className="h-4"></div>
        <div className="flex items-center gap-4">
          <TeamMembers />
          <InviteButton />
          <ArchiveButton />
        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          <AskQuestionCard />
          <MeetingCard />
        </div>
        <div className="mt-8"></div>

        <CommitLog />
      </div>
    </div>
  );
};

export default DashboardPage;
