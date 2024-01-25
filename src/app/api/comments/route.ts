import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.error();
  }
  const { feedbackId, listingId, message } = await request.json();
  if (!feedbackId || !listingId || !message) {
    console.log("missing fields");
    return NextResponse.error();
  }
  const validFeedback = await prisma.feedback.findUnique({
    where: {
      id: feedbackId,
    },
  });
  const validListing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  });
  if (!validListing || !validFeedback) {
    console.log("invalid ids");
    return NextResponse.error();
  }
  const newComment = await prisma.comment.create({
    data: {
      message,
      authorId: user.id,
      feedbackId,
      listingId,
    },
  });
  return NextResponse.json({ message: "thanks for your comment", newComment });
}
