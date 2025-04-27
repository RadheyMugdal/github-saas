import { useProject } from "@/hooks/useProject";
import { api } from "@/trpc/react";
import React from "react";

type Props = {};

const TeamMembers = (props: Props) => {
  const { projectId } = useProject();
  const { data: members } = api.project.getTeamMembers.useQuery({ projectId });
  return (
    <div className="flex items-center gap-2">
      {members?.map((member) => (
        <img
          src={member.user.imageUrl as string}
          alt={member.user.firstName as string}
          height={30}
          width={30}
          className="rounded-full"
        />
      ))}
    </div>
  );
};

export default TeamMembers;
