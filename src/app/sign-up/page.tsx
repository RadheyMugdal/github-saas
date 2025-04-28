"use client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Page = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <Card className="mx-4 w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-center text-lg">
          Sign up with Dionysus
        </CardTitle>
        <CardDescription className="text-center">
          Welcome! Sign up to get started with Dionysus
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Button
            variant={"outline"}
            className="w-full cursor-pointer shadow-sm"
            onClick={() => {
              signIn("google");
            }}
          >
            <FcGoogle className="" />
            Continue with Google
          </Button>

          <Button
            variant={"outline"}
            className="w-full cursor-pointer shadow-sm"
            onClick={() => {
              signIn("github");
            }}
          >
            <FaGithub className="" />
            Continue with Github
          </Button>
        </div>
      </CardContent>
      <div className="h-[1px] w-full bg-gray-200"></div>
      <CardFooter className="flex items-center justify-center">
        <p className="text-center text-sm opacity-60">
          Already have an account?{" "}
          <Link href={"/sign-in"} className=" ">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  </div>
);

export default Page;
