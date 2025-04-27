import { db } from "@/server/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ projectId: string }>;
};

const JoinHandler = async ({ params }: Props) => {
  const { projectId } = await params;
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const dbUser = await db.user.findUnique({ where: { id: userId } });

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  if (!dbUser) {
    await db.user.create({
      data: {
        id: userId,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddresses[0]?.emailAddress as string,
        imageUrl: user.imageUrl,
      },
    });
  }
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
        userId,
      },
    });
  } catch (error) {
    console.log("User already in project");
  }
  return redirect(`/dashboard`);
};

export default JoinHandler;
