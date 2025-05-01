import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 px-12">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="bg-gradient-radial absolute top-0 right-0 h-1/3 w-1/3 from-indigo-100/40 to-transparent"></div>
        <div className="bg-gradient-radial absolute bottom-0 left-0 h-1/2 w-1/2 from-cyan-100/30 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800">
            <span className="mr-2 h-2 w-2 rounded-full bg-indigo-600"></span>
            Simplifying Developer Onboarding
          </div>

          <h1 className="mb-6 text-2xl font-semibold md:text-5xl">
            Your Intelligent{" "}
            <span className="gradient-text">Developer Assistant</span>
          </h1>

          <p className="mx-auto mb-10 max-w-4xl text-sm text-slate-600 md:text-lg lg:max-w-3xl">
            Fast-track developer onboarding and team collaboration. Ask
            questions about your codebase and extract key insights from
            meetings—all in one unified dashboard.
          </p>

          <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href={"/sign-up"}>
              <Button size="lg" className="flex items-center gap-2">
                Try DevSage Free <ArrowRight size={18} />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              See Demo
            </Button>
          </div>

          {/* Dashboard Preview */}
          <div className="relative mx-auto max-w-5xl">
            <div className="rounded-xl border border-slate-100 bg-white shadow-2xl shadow-indigo-200/50">
              {/* Dashboard mockup */}
              <div className="flex items-center gap-2 rounded-t-xl bg-slate-800 p-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="mr-4 text-xs text-slate-400">Dashboard</span>
                </div>
              </div>
              <div className="grid max-h-[500px] min-h-[400px] overflow-hidden md:grid-cols-12"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
