"use server";
import prisma from "@/libs/prismadb";
import { safeReservationType } from "@/types/safeReservation";

export type reservationQueryType = {
  listing_id?: string;
  userId?: string;
  authorId?: string;
  status?: "PENDING" | "COMPLETED";
  type?: "OUTDATED" | "ACTIVE";
  page?: number;
};
export type reservertionReturnDataType = {
  reservations: safeReservationType[];
  pagination: {
    hasMore: boolean;
    total: number;
    maxPages: number;
  };
};
export async function getReservations(params?: reservationQueryType) {
  let query: any = {
    status: params?.status || "PENDING",
  };
  const limit = 10;
  const page = params?.page || 1;
  const skip = (page - 1) * limit;
  if (params?.listing_id) {
    query.listingId = params.listing_id;
  }

  if (params?.userId) {
    query.userId = params.userId;
  }

  if (params?.authorId) {
    query.listing = { userId: params.authorId };
  }
  if (params?.type) {
    if (params.type === "ACTIVE") {
      query = {
        ...query,
        endDate: {
          gte: new Date(),
        },
      };
    }
    if (params.type === "OUTDATED") {
      query = {
        ...query,
        endDate: {
          lt: new Date(),
        },
      };
    }
  } else {
    query = {
      ...query,
      endDate: {
        gte: new Date(),
      },
    };
  }
  const reservation = await prisma.reservation.findMany({
    where: query,
    include: {
      listing: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: limit + 1,
  });
  const totalReservations = await prisma.reservation.count({ where: query });
  const maxPages = Math.ceil(totalReservations / limit);
  const pagination = {
    hasMore: reservation.length > limit,
    maxPages,
    total: totalReservations,
  };
  if (pagination.hasMore) {
    reservation.pop();
  }

  const safeReservations = reservation.map((reservation) => ({
    ...reservation,
    createdAt: reservation.createdAt.toISOString(),
    endDate: reservation.endDate.toISOString(),
    startDate: reservation.startDate.toISOString(),
    listing: {
      ...reservation.listing,
      createdAt: reservation.listing.createdAt.toISOString(),
    },
  }));
  return {
    reservations: safeReservations || [],
    pagination,
  } as reservertionReturnDataType;
}
