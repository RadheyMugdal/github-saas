import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MDEditor from "@uiw/react-md-editor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useProject } from "@/hooks/useProject";
import React, { useState } from "react";
import { askQuestion } from "./actions";
import { readStreamableValue } from "ai/rsc";
import CodeReferences from "./code-references";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import useRefetch from "@/hooks/useRefetch";

const AskQuestionCard = () => {
  const { project } = useProject();
  const [open, setOpen] = React.useState(false);
  const [question, setQuestion] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [answer, setAnswer] = useState("");
  const refetch = useRefetch();
  const saveAnswer = api.project.saveAnswer.useMutation();
  const [fileReferences, setFileReferences] = React.useState<
    {
      fileName: string;
      sourceCode: string;
      summary: string;
    }[]
  >([]);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFileReferences([]);
    setAnswer("");
    if (!project?.id) return;
    setLoading(true);
    const { output, fileReferences } = await askQuestion(question, project.id);
    setOpen(true);
    setFileReferences(fileReferences);
    for await (const delta of readStreamableValue(output)) {
      if (delta) {
        setAnswer((ans) => ans + delta);
      }
    }
    setLoading(false);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[70vw]">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <DialogTitle>
                <img src="/logo.png" alt="" />
              </DialogTitle>
              <Button
                variant={"outline"}
                onClick={() => {
                  saveAnswer.mutate(
                    {
                      projectId: project?.id!,
                      question,
                      answer,
                      fileReferences,
                    },
                    {
                      onSuccess: () => {
                        toast.success("Answer saved!");
                        refetch();
                      },
                      onError: () => {
                        toast.error("Failed to save answer!");
                      },
                    },
                  );
                }}
              >
                Save Answer
              </Button>
            </div>
          </DialogHeader>
          <div data-color-mode="light" className="container">
            <MDEditor.Markdown
              source={answer}
              className="!h-full max-h-[40vh] max-w-[70vw] overflow-scroll"
            />
          </div>
          <div className="h-4"></div>
          <CodeReferences fileReferences={fileReferences} />
          <Button type="button" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
      <Card className="relative col-span-3">
        <CardHeader>
          <CardTitle>Ask a question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Textarea
              placeholder="Which file should i edit to change the home page?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="h-4"></div>
            <Button type="submit" disabled={loading}>
              Ask Dionysus
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AskQuestionCard;
