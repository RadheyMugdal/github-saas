"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Video } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  DOMKeyframesDefinition,
  ElementOrSelector,
  useAnimate,
} from "motion/react";

const Hero = () => {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate([
      [
        ".hero-title",
        { y: [40, 0], opacity: [0, 1] },
        { duration: 0.6, ease: "easeOut" },
      ],
      [
        ".hero-description",
        { y: [40, 0], opacity: [0, 1] },
        { duration: 0.6, ease: "easeOut" },
      ],
      [
        ".button-container",
        { y: [40, 0], opacity: [0, 1] },
        { duration: 0.6, ease: "easeOut" },
      ],
      [
        ".image-container",
        { y: [40, 0], opacity: [0, 1] },
        { duration: 0.6, ease: "easeOut" },
      ],
    ]);
  }, []);
  return (
    <section
      ref={scope}
      className="flex flex-col items-center justify-center gap-12 py-32"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-6">
        <h1 className="hero-title bg-linear-to-b from-zinc-900 to-zinc-700 bg-clip-text py-4 text-center text-4xl font-bold text-balance text-transparent md:text-5xl md:leading-14 lg:text-6xl">
          Understand any Github Repository in minutes
        </h1>
        <p className="text-muted-foreground hero-description mx-4 text-center text-xs md:max-w-[70%] md:text-sm">
          Ask questions about any codebase and get instant insights.Upload
          meeting recordings to extract key points and action item. Transform
          how you understand code changes and meetings
        </p>
      </div>
      <div className="button-container flex gap-6">
        <Button className="rounded-full bg-linear-to-b from-emerald-500 to-emerald-800 to-99% !px-4 !py-2 font-semibold">
          Try for free
          <ArrowRight />
        </Button>
        <Button variant={"secondary"} className="rounded-full">
          <Rocket />
          Watch Demo
        </Button>
      </div>
      <div className="image-container relative mx-8 my-8">
        <div className="bg-primary/30 absolute inset-0 z-10 rounded-xl blur-lg" />
        <Image
          src={"/image.png"}
          width={1024}
          height={1024}
          alt="dashboard image"
          className="relative z-20"
        />
      </div>
    </section>
  );
};

export default Hero;
