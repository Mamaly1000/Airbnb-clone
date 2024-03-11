"use server";
import prisma from "@/libs/prismadb";
import { listingReviewQueryType } from "@/components/listings/ListingReviews";
import { Feedback, Listing } from "@prisma/client";
import { safeReviewType } from "@/types/safeReviewType";

export async function getFeedbacks(params?: listingReviewQueryType) {
  let where: any = {};

  if (params?.userId) {
    where = {
      ...where,
      userId: params.userId,
    };
  }
  if (params?.listingId) {
    where = {
      ...where,
      listingId: params.listingId,
    };
  }

  const feedBacks = await prisma.feedback.findMany({
    where,
    take: 5,
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
  return (feedBacks || []) as Array<safeReviewType>;
}
