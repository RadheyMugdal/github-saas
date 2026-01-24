import { processMeeting } from "@/lib/assembly";
import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  // Verify authentication
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { meetingUrl, projectId, meetingId } = await req.json();
    const { summaries } = await processMeeting(meetingUrl);
    await db.issue.createMany({
      data: summaries.map((summary) => ({
        start: summary.start,
        end: summary.end,
        gist: summary.gist,
        headline: summary.headline,
        summary: summary.summary,
        meetingId,
      })),
    });
    await db.meeting.update({
      where: { id: meetingId },
      data: { status: "COMPLETED", name: summaries[0]!.headline },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
