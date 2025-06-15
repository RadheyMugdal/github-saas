"use client";
import React from "react";
import {
  Search,
  Upload,
  MessageSquare,
  FileText,
  BookText,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  style: React.CSSProperties;
}

const FeatureCard = ({
  title,
  description,
  icon,
  className,
  style,
}: FeatureCardProps) => {
  return (
    <div
      className={cn("rounded-xl p-6 transition-shadow", className)}
      style={style}
    >
      <div className="text-primary bg-accent mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold md:text-lg">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      title: "Smart Code Search",
      description:
        "Ask natural questions about your codebase and get intelligent answers with context.",
      icon: <Search size={24} />,
    },
    {
      title: "Meeting Audio Analysis",
      description:
        "Upload meeting recordings to extract key dev issues and action items automatically.",
      icon: <Upload size={24} />,
    },
    {
      title: "Developer Chat",
      description:
        "Engage in AI-powered conversations about your code with context from your repos.",
      icon: <MessageSquare size={24} />,
    },
    {
      title: "Documentation Generator",
      description:
        "Auto-generate documentation from your codebase to improve developer onboarding.",
      icon: <FileText size={24} />,
    },
    {
      title: "Knowledge Base",
      description:
        "Create and organize team knowledge in one searchable, easy-to-access platform.",
      icon: <BookText size={24} />,
    },
    {
      title: "Team Collaboration",
      description:
        "Share insights, code solutions, and meeting summaries with your entire team.",
      icon: <Users size={24} />,
    },
  ];

  return (
    <section id="features" className="px-12 py-12 md:px-20 lg:px-32">
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
          className="mx-auto mb-16 max-w-4xl text-center lg:max-w-2xl"
        >
          <h2 className="mb-4 text-2xl font-semibold md:text-4xl">
            Powerful Developer Tools
          </h2>
          <p className="text-xs text-slate-600 md:text-sm">
            DevSage combines AI-powered code understanding with meeting
            analytics to keep your team aligned and productive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.3, duration: 0.5 }}
              viewport={{ once: true, amount: 1 }}
            >
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                className={`animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
