"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRefetch from "@/hooks/useRefetch";
import { api } from "@/trpc/react";
import { Info, Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToke?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const router = useRouter();
  const checkCredits = api.project.checkCredits.useMutation();
  const { mutateAsync, isPending } = api.project.createProject.useMutation();
  const refetch = useRefetch();

  async function onSubmit(data: FormInput) {
    if (!checkCredits.data) {
      // First click - check credits
      checkCredits.mutate(
        {
          githubUrl: data.repoUrl,
          githubToken: data.githubToke,
        },
        {
          onSuccess: (result) => {
            if (result.fileCount > result.credits) {
              toast.error("Not enough credits!");
            }
          },
        },
      );
    } else {
      // Second click - create project
      try {
        const project = await mutateAsync({
          githubUrl: data.repoUrl,
          name: data.projectName,
          githubToken: data.githubToke,
        });

        toast.success(
          "Project created! Repository indexing is running in the background.",
        );
        reset();
        checkCredits.reset();
        refetch();

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } catch (error) {
        toast.error("Error creating project!");
      }
    }
  }

  const hasEnoughCredits = checkCredits.data?.fileCount
    ? checkCredits.data.fileCount <= checkCredits.data.credits
    : false;

  const canCreate = !!checkCredits.data && hasEnoughCredits;

  return (
    <div className="flex h-full items-center justify-center gap-12">
      <img
        src="https://img.freepik.com/free-vector/cloud-computing-concept_53876-64621.jpg?t=st=1745953922~exp=1745957522~hmac=6ed60f56b56f146e8a74b4eee14dd24b1ada46cfc5ed77f99701197100bb6cfc&w=1060"
        alt="logo"
        className="h-56 w-auto"
      />
      <div>
        <div>
          <h1 className="text-2xl font-semibold">
            Link your Github Repository
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter the URL of your repository to link it to DevSage.
          </p>
          <div className="h-4" />
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                required
                {...register("projectName", { required: true })}
                placeholder="Project Name"
              />
              <div className="h-2" />
              <Input
                required
                {...register("repoUrl", { required: true })}
                type="url"
                placeholder="Github URL"
              />
              <div className="h-2" />
              <Input
                {...register("githubToke")}
                placeholder="Github Token (optional)"
              />
              {!!checkCredits.data && (
                <>
                  <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-blue-700">
                    <div className="flex items-center gap-2">
                      <Info className="size-4" />
                      <p className="text-sm">
                        This repository has{" "}
                        <strong>{checkCredits.data.fileCount}</strong> files.
                      </p>
                    </div>
                    <p className="text-sm text-blue-600">
                      You have <strong>{checkCredits.data.credits}</strong>{" "}
                      credits remaining.
                    </p>
                    {!hasEnoughCredits && (
                      <p className="text-sm text-red-600 font-medium">
                        Not enough credits!
                      </p>
                    )}
                  </div>
                </>
              )}
              <div className="h-4" />
              <Button
                type="submit"
                disabled={
                  isPending ||
                  checkCredits.isPending ||
                  (checkCredits.data && !hasEnoughCredits)
                }
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Creating...
                  </>
                ) : checkCredits.isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Checking...
                  </>
                ) : canCreate ? (
                  "Create Project"
                ) : (
                  "Check Credits"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
