import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <section id="faq" className="bg-white px-12 py-28">
      <div className="container mx-auto">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-600 md:text-sm">
            Find answers to common questions about DevSage
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-xs font-medium md:text-sm">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center">
          <p className="mb-4 text-slate-600">Still have questions?</p>
          <a
            href="#contact"
            className="font-medium text-indigo-600 underline hover:text-indigo-800"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
