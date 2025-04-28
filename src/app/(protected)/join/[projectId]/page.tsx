import { db } from "@/server/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ projectId: string }>;
};

const JoinHandler = async ({ params }: Props) => {
  const { projectId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  const dbUser = await db.user.findUnique({ where: { id: session.user.id } });

  const project = await db.project.findUnique({
    where: { id: projectId },
    include: {
      userToProject: true,
    },
  });
  if (!project) {
    redirect("/dashboard");
  }
  try {
    await db.userToProject.create({
      data: {
        projectId: projectId,
        userId: session.user.id as string,
      },
    });
  } catch (error) {
    console.log("User already in project");
  }
  return redirect(`/dashboard`);
};

export default JoinHandler;
