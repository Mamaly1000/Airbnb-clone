import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { includes, without } from "lodash";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.error();
  }
  const feedbackId = params.id as string;
  if (!feedbackId) {
    console.log("missing field");
    return NextResponse.error();
  }
  const comments = await prisma.comment.findMany({
    where: {
      feedbackId: feedbackId,
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  if (!comments) {
    console.log("comments not found");
    return NextResponse.error();
  }
  return NextResponse.json(comments);
}
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.error();
  }

  const commentId = params.id as string;
  const { listingId } = await request.json();

  if (!listingId || !commentId) {
    console.log("missing field");
    return NextResponse.error();
  }

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!comment) {
    console.log("comment doesnt exist");
    return NextResponse.error();
  }

  const isLiked = includes(comment.likingIds, user.id);
  const likingIds = isLiked
    ? without(comment.likingIds, user.id)
    : [...comment.likingIds, user.id];
  await prisma.comment.update({
    where: { id: commentId },
    data: {
      likingIds,
    },
  });

  return NextResponse.json({
    message: `${isLiked ? "disliked" : "thanks for your like"}`,
  });
}
