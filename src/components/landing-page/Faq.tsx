"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

const FAQ = () => {
  const faqs = [
    {
      question: "How does DevSage analyze my codebase?",
      answer:
        "DevSage securely connects to your GitHub repositories and analyzes the code structure, dependencies, and relationships. It builds a knowledge graph of your codebase that allows for natural language queries and intelligent responses based on your specific code context.",
    },
    {
      question: "Is my code and meeting data secure?",
      answer:
        "Yes, security is our top priority. DevSage uses end-to-end encryption for all data transfers and storage. We only access the repositories you explicitly grant permission to, and all meeting recordings are processed on secure servers and can be automatically deleted after analysis if preferred.",
    },
    {
      question:
        "How accurate is the meeting transcription and summary feature?",
      answer:
        "Our advanced AI models achieve over 95% accuracy in transcribing technical discussions. The summary feature extracts development-specific items such as bugs mentioned, feature requests, architecture decisions, and action items, with continuous improvements through machine learning.",
    },
    {
      question: "Can DevSage integrate with our existing development tools?",
      answer:
        "Absolutely! DevSage integrates with popular development tools including GitHub, GitLab, Bitbucket, Jira, Slack, Microsoft Teams, and more. Our API allows for custom integrations with your specific workflow tools.",
    },
    {
      question: "How long does it take to set up DevSage?",
      answer:
        "Most teams are up and running with DevSage in less than 15 minutes. Simply connect your repositories, invite team members, and you're ready to start asking questions about your code and uploading meeting recordings for analysis.",
    },
    {
      question: "Do you offer custom solutions for enterprise clients?",
      answer:
        "Yes, our Enterprise plan includes custom integrations, dedicated support, enhanced security features, and can be tailored to your organization's specific requirements. Contact our sales team for a personalized demo and consultation.",
    },
  ];

  return (
    <section id="faq" className="px-12 py-20">
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
          <h2 className="mb-4 text-2xl font-semibold md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-xs opacity-80 md:text-sm">
            Find answers to common questions about DevSage
          </p>
        </motion.div>

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
          className="mx-auto max-w-3xl"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-xs font-medium md:text-sm">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="opacity-80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-16 text-center">
          <p className="mb-4 text-slate-600">Still have questions?</p>
          <a
            href="#contact"
            className="font-medium text-blue-600 underline hover:text-blue-800"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
