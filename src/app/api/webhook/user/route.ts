import { db } from "@/server/db";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    await db.user.upsert({
      where: {
        emailAddress: data.email_addresses[0]?.email_address ?? "",
      },
      update: {
        id: data.id,
        imageUrl: data.image_url,
        firstName: data.first_name,
        lastName: data.last_name,
      },
      create: {
        id: data.id,
        emailAddress: data.email_addresses[0]?.email_address ?? "",
        imageUrl: data.image_url,
        firstName: data.first_name,
        lastName: data.last_name,
      },
    });
    return NextResponse.json(
      { message: "User data updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
