import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { ReviewFilterTypes, ReviewSortTypes } from "@/types/ReviewTypes";
import { Feedback, Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const currentUser = await serverAuth(req, res);
    if (!currentUser) {
      return res.status(401).json({ message: "unAuthrized" });
    }
    const {
      sortIn = "desc",
      sort = "CREATED_AT",
      search,
      listing_name,
      filterType,
      min,
      max,
      listingId,
      userId,
      paginate = "false",
      page,
      endDate,
      startDate,
    }: {
      page?: string;
      sortIn?: "desc" | "asc";
      sort?: ReviewSortTypes;
      search?: string;
      listing_name?: string;
      filterType?: ReviewFilterTypes;
      min?: string;
      max?: string;
      userId?: string;
      listingId?: string;
      paginate?: "true" | "false";
      startDate?: string;
      endDate?: string;
    } = req.query;
    let orderBy:
      | Prisma.FeedbackOrderByWithRelationInput
      | Prisma.FeedbackOrderByWithRelationInput[]
      | undefined = {
      createdAt: sortIn,
    };
    let where: Prisma.FeedbackWhereInput = {
      listing: {
        userId: currentUser.currentUser.id,
      },
    };
    if (filterType && !!min && !!max) {
      let range = {
        gt: +min,
        lt: +max,
      };
      if (filterType === "ACCURACY") {
        where.accuracy = range;
      }
      if (filterType === "CHECK_IN") {
        where.checkIn = range;
      }
      if (filterType === "CLEANLINESS") {
        where.cleanliness = range;
      }
      if (filterType === "COMMUNICATION") {
        where.communication = range;
      }
      if (filterType === "LOCATION") {
        where.location = range;
      }
      if (filterType === "RATING") {
        where.rating = range;
      }
      if (filterType === "VALUE") {
        where.value = range;
      }
      if (filterType === "LISTING_ID" && listingId) {
        where.listingId = listingId;
      }
      if (filterType === "USER_ID" && userId) {
        where.userId = userId;
      }
      if (filterType === "LISTING_NAME") {
        where.listing = { title: listing_name };
      }
      if (filterType === "CREATED_AT" && startDate && endDate) {
        where.createdAt = {
          lte: new Date(endDate),
          gte: new Date(startDate),
        };
      }
    }
    if (sort) {
      if (sort === "ACCURACY") {
        orderBy = {
          accuracy: sortIn,
        };
      }
      if (sort === "BODY") {
        orderBy = {
          body: sortIn,
        };
      }
      if (sort === "CHECK_IN") {
        orderBy = {
          checkIn: sortIn,
        };
      }
      if (sort === "CLEANLINESS") {
        orderBy = {
          cleanliness: sortIn,
        };
      }
      if (sort === "COMMUNICATION") {
        orderBy = {
          communication: sortIn,
        };
      }
      if (sort === "CREATED_AT") {
        orderBy = {
          createdAt: sortIn,
        };
      }
      if (sort === "LISTING_NAME") {
        orderBy = {
          listing: { title: sortIn },
        };
      }
      if (sort === "LOCATION") {
        orderBy = {
          location: sortIn,
        };
      }
      if (sort === "RATING") {
        orderBy = {
          rating: sortIn,
        };
      }
      if (sort === "USER_NAME") {
        orderBy = {
          user: { name: sortIn },
        };
      }
      if (sort === "VALUE") {
        orderBy = {
          value: sortIn,
        };
      }
    }
    if (search) {
      where.OR = [
        { body: { contains: search } },
        { body: { startsWith: search } },
        { body: { endsWith: search } },
      ];
    }
    let reviews: Feedback[] = [];
    const limit = 10;
    const currentPage = +(page || 1);
    const skip = (currentPage - 1) * limit;
    const totalReviews = await prisma.feedback.count({ where });
    const maxPages = Math.ceil(totalReviews / limit);
    if (paginate === "false") {
      reviews = await prisma.feedback.findMany({
        where,
        orderBy,
      });
    }
    if (paginate === "true") {
      reviews = await prisma.feedback.findMany({
        where,
        orderBy,
        take: limit + 1,
        skip,
      });
    }
    const hasMore = reviews.length > limit;
    if (hasMore) {
      reviews.pop();
    }
    return res.status(200).json({
      reviews,
      pagination: {
        maxPages,
        currentPage,
        hasMore,
        totalReviews,
        nextPage: currentPage + 1,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error in getting reviews", error });
  }
}
