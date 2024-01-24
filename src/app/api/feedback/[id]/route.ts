import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

import { includes, without } from "lodash";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.error();
  }

  const feedbackId = params.id as string;
  const { listingId } = await request.json();

  if (!listingId || !feedbackId) {
    console.log("missing field");
    return NextResponse.error();
  }

  const feedback = await prisma.feedback.findUnique({
    where: {
      id: feedbackId,
    },
  });

  if (!feedback) {
    console.log("feedback doesnt exist");
    return NextResponse.error();
  }

  const isLiked = includes(feedback.likingIds, user.id);
  const likingIds = isLiked
    ? without(feedback.likingIds, user.id)
    : [...feedback.likingIds, user.id];
  await prisma.feedback.update({
    where: { id: feedbackId },
    data: {
      likingIds,
    },
  });

  return NextResponse.json({
    message: `${isLiked ? "disliked" : "thanks for your like"}`,
  });
}
