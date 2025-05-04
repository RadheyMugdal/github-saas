import { GoogleGenerativeAI } from "@google/generative-ai";
import { Document } from "@langchain/core/documents";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const aiSummarizeCommit = async (diff: string) => {
  const res = await model.generateContent([
    `
You are an expert programmer, and you are trying to summarize a git diff.

Reminders about the git diff format:
For every file, there are a few metadata lines, like (for example):
---
diff --git a/lib/index.js b/lib/index.js
index 2c6e0f3..d1b4a5d 100644
--- a/lib/index.js
+++ b/lib/index.js
---

This means that 'lib/index.js' was modified in this commit. Note that this is only an example. 

Then there is a specifier of the lines that were modified:
- A line starting with '+' means it was added.
- A line starting with '-' means it was deleted.
- A line starting with neither '+' nor '-' is context, for better understanding.

---

Below are examples of summary comments to use as reference for the format:

---
* Raised the amount of returned recording from 1 to 2 in the getRecording function.
* Added a new function called getRecordings that returns an array of recordings.
* Added a new function called getRecording that returns a single recording.
* Updated the getRecording function to return a single recording instead of an array of recordings.
---

Most commits will have fewer comments than this example.

The last comment does not include the file names, because there were more than two relevant files in the hypothetical commit.

Do not include any part of the example in your summary. It is provided only as guidance for appropriate summary formatting.

---

Please summarize the following diff file:

${diff}
    `,
  ]);

  return res.response.text();
};

export async function summarizeCode(doc: Document) {
  try {
    const code = doc.pageContent.slice(1, 10000);
    const response = await model.generateContent([
      `You are an intelligent senior software engineer who specialize in onboarding junior software engineers onto projects. `,
      ` You are onboarding a junior software engineer and explaining to them the purpose of the ${doc.metadata.source} file.
            Here is the code:
            ---
            ${code}
            ---
            Give a summary no more than 100 words of the code above.
        `,
    ]);
    return response.response.text();
  } catch (error) {
    return "";
  }
}

export async function generateEmbedding(summary: string) {
  const model = genAI.getGenerativeModel({
    model: "text-embedding-004",
  });
  const result = await model.embedContent(summary);
  const embedding = result.embedding;
  return embedding.values;
}
