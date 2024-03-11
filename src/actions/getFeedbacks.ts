"use server";
import prisma from "@/libs/prismadb";
import { listingReviewQueryType } from "@/components/listings/ListingReviews";
import { safeReviewType } from "@/types/safeReviewType";

export async function getFeedbacks(params?: listingReviewQueryType) {
  let where: any = {};
  const limit = params?.limit || 10;
  const page = params?.page || 1;
  const skip = (page - 1) * limit;
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
    take: limit + 1,
    skip,
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
  const totalReviews = await prisma.feedback.count({ where });
  const maxPages = Math.ceil(totalReviews / limit);
  const pagination = {
    hasMore: feedBacks.length > limit,
    maxPages,
    total: totalReviews,
  };
  if (pagination.hasMore) {
    feedBacks.pop();
  }

  return { reviews: feedBacks || [], pagination } as {
    reviews: Array<safeReviewType>;
    pagination: {
      total: number;
      maxPages: number;
      hasMore: boolean;
    };
  };
}
