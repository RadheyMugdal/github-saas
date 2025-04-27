"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRefetch from "@/hooks/useRefetch";
import { api } from "@/trpc/react";
import { Info } from "lucide-react";

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
  const checkCredits = api.project.checkCredits.useMutation();
  const { mutateAsync, isPending, data } =
    api.project.createProject.useMutation();
  const refetch = useRefetch();
  async function onSubmit(data: FormInput) {
    if (!!checkCredits.data) {
      await mutateAsync({
        githubUrl: data.repoUrl,
        name: data.projectName,
        githubToken: data.githubToke,
      });
      if (data) {
        toast.success("Project created successfully!");
        reset();
        refetch();
      } else {
        toast.error("Error creating project!");
      }
    } else {
      checkCredits.mutate({
        githubUrl: data.repoUrl,
        githubToken: data.githubToke,
      });
    }
  }
  const hasEnoughCredits = checkCredits.data?.fileCount
    ? checkCredits.data.fileCount <= checkCredits.data.credits
    : false;
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
              {!!checkCredits.data && (
                <>
                  <div className="mt-4 rounded-md border border-orange-200 bg-orange-50 px-4 py-2 text-orange-700">
                    <div className="flex items-center gap-2">
                      <Info className="size-4" />
                      <p className="text-sm">
                        You will be charged{" "}
                        <strong>{checkCredits.data.credits}</strong> credits for
                        this repository.
                      </p>
                    </div>
                    <p className="text-sm text-blue-600">
                      You have <strong>{checkCredits.data.fileCount}</strong>{" "}
                      credits remaining.
                    </p>
                  </div>
                </>
              )}
              <div className="h-4"></div>
              <Button
                type="submit"
                disabled={
                  isPending || !!checkCredits.isPending || hasEnoughCredits
                }
              >
                {!!checkCredits.data ? "Create project" : "Check credit"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
