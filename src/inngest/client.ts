import { Inngest } from "inngest";
import { env } from "@/env.js";

export const inngest = new Inngest({
  id: "github-saas",
  // apiKey: env.INNGEST_KEY,
  // signingKey: env.INNGEST_SIGNING_KEY,
});
