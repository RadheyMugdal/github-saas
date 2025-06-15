"use client";
import { motion } from "motion/react";
import StepCard from "../how-it-works/Stepcard";

const HowItWorks = () => {
  const steps = [
    {
      index: 1,
      title: "Connect Your Repository",
      description:
        "Paste your GitHub repository URL and let DevSage analyze your codebase structure and dependencies.",
      image: "/connect-repo.png",
    },
    {
      index: 2,
      title: "Explore & Ask Questions",
      description:
        "Search through your code with natural language queries and get contextualized answers about your project.",

      image: "/ask-que.png",
    },
    {
      index: 3,
      title: "Upload Meeting Recordings",
      description:
        "Upload your team meetings and DevSage will automatically generate summaries with development-focused insights.",
      image: "/meeting-upload.png",
    },
    {
      index: 4,
      title: "Collaborate & Share Insights",
      description:
        "Share findings with your team and integrate seamlessly into your existing development workflow.",
      image: "/invite.png",
    },
  ];

  return (
    <section id="how-it-works" className="px-12 py-24 md:px-20">
      <div className="container mx-auto">
        <motion.div
          initial={{
            y: 40,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.6,
              ease: "easeOut",
            },
          }}
          viewport={{
            once: true,
            amount: 1,
          }}
          className="mx-auto mb-20 max-w-2xl text-center"
        >
          <h2 className="mb-4 text-2xl font-semibold md:text-4xl">
            How DevSage Works
          </h2>
          <p className="text-xs opacity-80 md:text-sm">
            Get started in minutes with these simple steps to unlock your
            team&apos;s potential
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector Line */}
          {/* <div className="from-primary absolute top-12 bottom-12 left-1/2 hidden w-0.5 -translate-x-1/2 bg-gradient-to-b to-cyan-500 lg:block"></div> */}

          <div className="flex flex-col items-center justify-center gap-12 space-y-16 lg:space-y-0">
            {steps.map((step, index) => (
              <StepCard step={step} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
