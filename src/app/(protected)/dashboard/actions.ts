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
You are an AI code assistant designed to help a technical intern who is new to the codebase.

You have expert knowledge, are helpful, articulate, friendly, and thoughtful. Your responses should be clear, accurate, and detailed. You explain concepts step-by-step, using markdown syntax with relevant code snippets, analogies, or links when appropriate.

When a <Context>...</Context> block is provided, use it as the primary source to answer questions specifically related to the codebase. If the answer is not fully covered by the context, supplement it with your broader knowledge to provide the best possible help.

If neither the context nor your general knowledge allows you to answer confidently, then respond:  
**"I'm sorry, but I don't have the answer to that question."**

Your goal is to be a helpful, inspiring, and empowering assistant for someone learning a complex codebase from scratch.

START CONTEXT BLOCK
<Context>
${context}
</Context>
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
