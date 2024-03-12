"use server";
import prisma from "@/libs/prismadb";
import { safeReviewType } from "@/types/safeReviewType";

export type FeedbackQueryType = {
  userId?: string | undefined;
  limit?: number | undefined;
  listingId?: string | undefined;
  page?: number | undefined;
  search?: string;
  reservationId?: string;
};

export type FeedbackOverallDataType = {
  id: string;
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
  rating: number;
}[];

export type FeedbackReturnType = {
  reviews: Array<safeReviewType>;
  pagination: {
    total: number;
    maxPages: number;
    hasMore: boolean;
  };
  overallData: {
    id: string;
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
    rating: number;
  }[];
};

export async function getFeedbacks(
  params?: FeedbackQueryType
): Promise<FeedbackReturnType> {
  let where: any = {};
  let overallData: {
    id: string;
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
    rating: number;
  }[] = [];
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
    const allListingFeedbacks = await prisma.feedback.findMany({
      where: {
        listingId: params.listingId,
      },
      select: {
        id: true,
        accuracy: true,
        checkIn: true,
        cleanliness: true,
        communication: true,
        location: true,
        value: true,
        rating: true,
      },
    });

    overallData = allListingFeedbacks;
    where = {
      ...where,
      listingId: params.listingId,
    };
  }

  if (params?.search) {
    where = {
      ...where,
      OR: [
        {
          listing: {
            category: {
              contains: params?.search,
            },
          },
        },
        {
          listing: {
            description: {
              contains: params?.search,
            },
          },
        },
        {
          listing: {
            title: {
              contains: params?.search,
            },
          },
        },
        {
          body: {
            contains: params.search,
          },
        },
        {
          user: {
            name: {
              contains: params.search,
            },
          },
        },
      ],
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

  return { reviews: feedBacks || [], pagination, overallData } as {
    reviews: Array<safeReviewType>;
    pagination: {
      total: number;
      maxPages: number;
      hasMore: boolean;
    };
    overallData: {
      id: string;
      cleanliness: number;
      accuracy: number;
      checkIn: number;
      communication: number;
      location: number;
      value: number;
      rating: number;
    }[];
  };
}
