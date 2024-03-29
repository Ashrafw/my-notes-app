import { uploadFileToFirebase } from "@/firebase";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { noteId } = await req.json();

    const notes = await db
      .select()
      .from($notes)
      .where(eq($notes.id, parseInt(noteId)));

    if (!notes[0].imageUrl) {
      return new NextResponse("no image url", { status: 400 });
    }

    const firebase_url = (await uploadFileToFirebase(
      notes[0].imageUrl,
      notes[0].name
    )) as string;

    if (!firebase_url) throw new Error("no firebase-url");

    await db
      .update($notes)
      .set({
        imageUrl: firebase_url,
      })
      .where(eq($notes.id, parseInt(noteId)));

    return new NextResponse("ok", { status: 200 });
  } catch (error) {
    console.log("uploading to firebase error", error);
    return new NextResponse("error", { status: 500 });
  }
}
