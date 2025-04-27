"use server";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateEmbedding } from "@/lib/gemini";
import { db } from "@/server/db";
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function askQuestion(question: string, projectId: string) {
  const stream = createStreamableValue();
  const queryVector = await generateEmbedding(question);
  const vectorQuery = `[${queryVector.join(",")}]`;

  const result = (await db.$queryRaw`
    SELECT "fileName","sourceCode","summary",1-("summaryEmbedding"<=> ${vectorQuery}::vector) AS similarity
    FROM "SourceCodeEmbedding"
    WHERE 1-("summaryEmbedding"<=> ${vectorQuery}::vector)> 0.5
    AND "projectId" = ${projectId}
    ORDER BY similarity DESC
    LIMIT 10
    `) as { fileName: string; sourceCode: string; summary: string }[];

  let context = "";
  for (const doc of result) {
    context += `source: ${doc.sourceCode}\ncode content: ${doc.sourceCode}\n summary of the file ${doc.summary}\n\n`;
  }

  (async () => {
    const { textStream } = streamText({
      model: google("gemini-1.5-flash"),
      prompt: `
        You are an AI code assistant. Your audience is a technical intern who is new to the codebase.

The AI assistant is a powerful, human-like artificial intelligence. Its traits include expert knowledge, helpfulness, cleverness, and articulateness. The assistant is well-behaved, well-managed, friendly, kind, and inspiring. It provides vivid, thoughtful, step-by-step responses. It possesses the sum of all knowledge and can accurately answer nearly any question about the codebase.

If the question is about code or a specific file, the AI will give a detailed answer with clear, step-by-step instructions. All responses should be in markdown syntax, include code snippets when helpful, and be as detailed and unambiguous as possible.

The AI assistant will take into account any CONTEXT BLOCK provided in the conversation. If the context does not provide the answer to the question, the AI will respond: "I'm sorry, but I don't have the answer to that question."

The AI assistant will not invent or assume anything that is not directly drawn from the context.

Prompt Template:
START CONTEXT BLOCK
${context}
END CONTEXT BLOCK

START QUESTION
${question}
END QUESTION

         `,
    });
    for await (const delta of textStream) {
      stream.update(delta);
    }
    stream.done();
  })();

  return {
    output: stream.value,
    fileReferences: result,
  };
}
