import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  {
    /* check if user is logged in*/
  }
  const { userId } = auth();

  if (!userId) new NextResponse("unauthorized", { status: 401 });

  const body = await req.json();
  const { name } = body;

  const image_description = await generateImagePrompt(name);
  if (!image_description) {
    return new NextResponse("failed to generate image description", {
      status: 500,
    });
  }

  const image_url = await generateImage(image_description as string);
  if (!image_url) {
    return new NextResponse("failed to generate image ", {
      status: 500,
    });
  }
  const notes_ids = await db
    .insert($notes)
    .values({
      userId,
      name,
      imageUrl: image_url,
    })
    .returning({ insertedId: $notes.id });
  return NextResponse.json({ note_id: notes_ids[0].insertedId });
}
