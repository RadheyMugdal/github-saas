"use server";

import { streamText } from "ai";
import { generateEmbedding, openrouter } from "@/lib/gemini";
import { db } from "@/server/db";

export async function askQuestion(question: string, projectId: string) {
  // 1️⃣ Create embedding
  const queryVector = await generateEmbedding(question);
  const vectorQuery = `[${queryVector.join(",")}]`;

  // 2️⃣ Vector similarity search (pgvector)
  const result = await db.$queryRaw<
    {
      fileName: string;
      sourceCode: string;
      summary: string;
      similarity: number;
    }[]
  >`
    SELECT 
      "fileName",
      "sourceCode",
      "summary",
      1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
    FROM "SourceCodeEmbedding"
    WHERE 
      1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) > 0.5
      AND "projectId" = ${projectId}
    ORDER BY similarity DESC
    LIMIT 10
  `;

  // 3️⃣ Build context
  const context = result
    .map(
      (doc) => `
FILE: ${doc.fileName}

CODE:
${doc.sourceCode}

SUMMARY:
${doc.summary}
`
    )
    .join("\n\n---\n\n");

  // 4️⃣ Stream response (LATEST SDK WAY)
  const streamResult = await streamText({
    model: openrouter("google/gemini-2.0-flash-exp:free"),
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: `
You are an AI code assistant helping a technical intern understand a codebase.

Rules:
- Be clear and structured
- Explain step-by-step
- Use the provided context as the primary source
- If you cannot answer confidently, say:
"I'm sorry, but I don't have the answer to that question."
        `,
      },
      {
        role: "user",
        content: `
<Context>
${context}
</Context>

<Question>
${question}
</Question>
        `,
      },
    ],
  });

  return {
    stream: streamResult.textStream,
    fileReferences: result,
  };
}
