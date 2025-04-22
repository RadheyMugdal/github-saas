"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRefetch from "@/hooks/useRefetch";
import { api } from "@/trpc/react";

import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToke?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProject = api.project.createProject.useMutation();
  const refetch = useRefetch();
  function onSubmit(data: FormInput) {
    createProject.mutate(
      {
        githubUrl: data.repoUrl,
        name: data.projectName,
        githubToken: data.githubToke,
      },
      {
        onSuccess: () => {
          toast.success("Project created successfully");
          refetch();
          reset();
        },
        onError: () => {
          toast.error("Failed to create project");
        },
      },
    );
  }

  return (
    <div className="flex h-full items-center justify-center gap-12">
      <Image src={"/logo.png"} alt="logo" className="h-56 w-auto" />
      <div>
        <div>
          <h1 className="text-2xl font-semibold">
            Link your Github Repository
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter the URL of your repository to link it to Dionysus.
          </p>
          <div className="h-4"></div>
          <div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <Input
                required
                {...register("projectName", { required: true })}
                placeholder="Project Name"
              />
              <div className="h-2"></div>
              <Input
                required
                {...register("repoUrl", { required: true })}
                type="url"
                placeholder="Github URL"
              />
              <div className="h-2"></div>
              <Input
                {...register("githubToke")}
                placeholder="Github Token (optional)"
              />
              <div className="h-4"></div>
              <Button type="submit" disabled={createProject.isPending}>
                Create Project
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
