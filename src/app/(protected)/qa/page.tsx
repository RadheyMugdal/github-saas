"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useProject } from "@/hooks/useProject";
import { api } from "@/trpc/react";
import React from "react";
import AskQuestionCard from "../dashboard/ask-question-card";
import MDEditor from "@uiw/react-md-editor";
import CodeReferences from "../dashboard/code-references";

const QAPage = () => {
  const { projectId } = useProject();
  const { data: questions } = api.project.getQuestions.useQuery({ projectId });
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const question = questions?.[questionIndex];

  return (
    <Sheet>
      <AskQuestionCard />
      <div className="h-4"></div>
      <h1 className="text-xl font-semibold">Saved Questions</h1>
      <div className="flex flex-col gap-2">
        {questions?.map((question) => (
          <React.Fragment key={question.id}>
            <SheetTrigger>
              <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow">
                <img
                  className="rounded-full"
                  height={30}
                  width={30}
                  src={question.user.imageUrl as string}
                />
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <p className="line-clamp-1 text-lg font-medium text-gray-700">
                      {question.question}
                    </p>
                    <span className="text-xs whitespace-nowrap text-gray-400">
                      {question.createdAt.toLocaleString()}
                    </span>
                  </div>
                  <p className="line-clamp-1 text-sm text-gray-800">
                    {question.answer}
                  </p>
                </div>
              </div>
            </SheetTrigger>
          </React.Fragment>
        ))}
        {question && (
          <SheetContent className="overflow-scroll sm:max-w-[80vw]">
            <SheetHeader>
              <SheetTitle>{question.question}</SheetTitle>
              <div data-color-mode="light" className="container">
                <MDEditor.Markdown source={question.answer} />
              </div>
              <CodeReferences
                fileReferences={question.filesReferences ?? ([] as any)}
              />
            </SheetHeader>
          </SheetContent>
        )}
      </div>
    </Sheet>
  );
};

export default QAPage;
