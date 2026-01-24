import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { indexRepoJob } from "@/inngest/functions/index-repo";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [indexRepoJob],
});
