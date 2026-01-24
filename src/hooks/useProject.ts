import { api } from "@/trpc/react";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";

export const useProject = () => {
  const { data: projects, refetch } = api.project.getProjects.useQuery();
  const [projectId, setProjectId] = useLocalStorage("selected-project", "");
  const project = projects?.find((project) => project.id === projectId);

  // Auto-refetch when any project is being indexed
  useEffect(() => {
    const hasProcessingProject = projects?.some(
      (p) => p.indexStatus === "PROCESSING" || p.indexStatus === "PENDING",
    );

    if (hasProcessingProject) {
      const interval = setInterval(() => {
        refetch();
      }, 2000); // Poll every 2 seconds

      return () => clearInterval(interval);
    }
  }, [projects, refetch]);

  return {
    projects,
    project,
    projectId,
    setProjectId,
  };
};
