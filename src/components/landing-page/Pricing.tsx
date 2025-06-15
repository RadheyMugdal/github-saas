"use client";
import React from "react";
import { Check, CreditCard, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "motion/react";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="text-muted-foreground from-primary/20 mx-6 rounded-3xl bg-linear-to-b to-white px-12 py-24"
    >
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
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="mb-4 text-2xl font-semibold text-black md:text-4xl">
            Simple, Credit-Based Pricing
          </h2>
          <p className="text-xs opacity-80 md:text-sm">
            Buy credits as you need them and pay only for what you use
          </p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,

            transition: {
              duration: 0.7,
              ease: "backOut",
              delay: 0.3,
            },
          }}
          viewport={{
            amount: 0.3,
            once: true,
          }}
          className="mx-auto max-w-4xl"
        >
          <div className="rounded-xl border bg-white p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Pricing Info Side */}
              <div className="space-y-6">
                <h3 className="mb-2 text-2xl font-bold">Credit System</h3>

                <div className="flex items-center gap-2 text-xl">
                  <DollarSign size={20} className="text-green-600" />
                  <span className="font-bold">$1 = 50 credits</span>
                </div>

                <div className="text-primary mb-4 flex items-center gap-2">
                  <CreditCard size={18} />
                  <span>1 credit = 1 file analyzed</span>
                </div>

                <div className="rounded-lg border border-indigo-100 bg-blue-50 p-4">
                  <p className="font-medium text-blue-800">
                    New users get 150 credits for free!
                  </p>
                </div>

                <h4 className="mt-6 text-lg font-medium">
                  What you can do with credits:
                </h4>
                <ul className="space-y-3">
                  {[
                    "Analyze code files from any GitHub repository",
                    "Generate detailed insights and documentation",
                    "Access AI-powered code explanations",
                    "Process meeting audio to extract development tasks",
                    "Export summaries and findings",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check
                        size={18}
                        className="mt-0.5 flex-shrink-0 text-green-500"
                      />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Purchase Credits Side */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="mb-6 text-xl font-bold">Buy Credits</h3>

                <div className="space-y-6">
                  <div className="rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-indigo-300">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium">250 credits</span>
                      <span className="font-bold text-green-600">$5</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      Perfect for individual developers or small projects
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-indigo-300">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium">1000 credits</span>
                      <span className="font-bold text-green-600">$20</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      Great for teams working on multiple repositories
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-indigo-300">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium">5000 credits</span>
                      <span className="font-bold text-green-600">$100</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      Ideal for organizations with larger codebases
                    </p>
                  </div>
                  <Link href={"/billing"}>
                    <Button className="w-full">Go to Billing</Button>
                  </Link>

                  <p className="text-center text-sm text-slate-500">
                    Need a custom credit package?{" "}
                    <a
                      href="#contact"
                      className="text-indigo-600 hover:underline"
                    >
                      Contact us
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
