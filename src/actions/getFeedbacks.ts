import { NextResponse } from "next/server";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/libs/prismadb";

export async function getFeedbacks() {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }
  const feedBacks = await prisma.feedback.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          id: true,
          createdAt: true,
        },
      },
      listing: true,
      comments: {
        select: {
          authorId: true,
        },
      },
    },
  });
  return feedBacks;
}
