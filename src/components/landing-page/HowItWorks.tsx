import React from "react";
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Connect Your Repository",
      description:
        "Paste your GitHub repository URL and let DevSage analyze your codebase structure and dependencies.",
    },
    {
      number: "02",
      title: "Explore & Ask Questions",
      description:
        "Search through your code with natural language queries and get contextualized answers about your project.",
    },
    {
      number: "03",
      title: "Upload Meeting Recordings",
      description:
        "Upload your team meetings and DevSage will automatically generate summaries with development-focused insights.",
    },
    {
      number: "04",
      title: "Collaborate & Share Insights",
      description:
        "Share findings with your team and integrate seamlessly into your existing development workflow.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-white px-12 py-28 md:px-20">
      <div className="container mx-auto">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
            How DevSage Works
          </h2>
          <p className="text-xs text-slate-600 md:text-sm">
            Get started in minutes with these simple steps to unlock your team's
            potential
          </p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="absolute top-12 bottom-12 left-1/2 hidden w-0.5 -translate-x-1/2 bg-gradient-to-b from-indigo-500 to-cyan-500 lg:block"></div>

          <div className="space-y-16 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-8 lg:flex-row lg:items-start"
              >
                <div
                  className={`lg:w-1/2 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className="mx-auto max-w-md lg:mx-0">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                        {step.number}
                      </div>
                      <ArrowRight size={20} className="text-indigo-600" />
                    </div>
                    <h3 className="mb-3 text-lg font-bold md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="md:text-md text-sm text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div
                  className={`lg:w-1/2 ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div
                    className={`flex h-64 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 p-4 ${index % 2 === 0 ? "lg:ml-auto" : "lg:mr-auto"} max-w-md`}
                  >
                    <div className="text-sm text-slate-400">
                      Step {parseInt(step.number)} Illustration
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
