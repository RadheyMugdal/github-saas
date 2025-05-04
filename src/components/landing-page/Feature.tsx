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
      className={cn(
        "rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
      style={style}
    >
      <div className="text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
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
    <section
      id="features"
      className="bg-slate-50 px-12 py-28 md:px-20 lg:px-32"
    >
      <div className="container mx-auto">
        <div className="mx-auto mb-16 max-w-4xl text-center lg:max-w-2xl">
          <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
            Powerful Developer Tools
          </h2>
          <p className="text-xs text-slate-600 md:text-sm">
            DevSage combines AI-powered code understanding with meeting
            analytics to keep your team aligned and productive.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              className={`animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
