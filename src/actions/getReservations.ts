"use server";
import prisma from "@/libs/prismadb";
import { safeReservationType } from "@/types/safeReservation";
import { revalidatePath } from "next/cache";

export type reservationQueryType = {
  listing_id?: string;
  userId?: string;
  authorId?: string;
  status?: "PENDING" | "COMPLETED";
  type?: "OUTDATED" | "ACTIVE" | "ALL";
  page?: number;
  pathname?: string | null;
};
export type reservertionReturnDataType = {
  reservations: safeReservationType[];
  pagination: {
    hasMore: boolean;
    total: number;
    maxPages: number;
  };
};
export async function getReservations(
  params?: reservationQueryType
): Promise<reservertionReturnDataType> {
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
    if (params.type === "OUTDATED" && params.userId) {
      const outdatedReservations = await prisma.reservation.findMany({
        where: {
          ...query,
          endDate: {
            lt: new Date(),
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          listing: true,
        },
      });
      const safeReservations = outdatedReservations.map((reservation) => ({
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
        reservations: safeReservations,
        pagination: {
          hasMore: false,
          maxPages: 1,
          total: outdatedReservations.length,
        },
      };
    }
    if (params.type === "ALL" && params.listing_id) {
      const allReservations = await prisma.reservation.findMany({
        where: {
          listingId: params.listing_id,
        },
        include: {
          listing: true,
        },
      });
      const safeReservations = allReservations.map((reservation) => ({
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
        pagination: {
          hasMore: false,
          maxPages: 1,
          total: safeReservations.length,
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
  if (params?.status) {
    if (params.status === "COMPLETED") {
      query = {
        userId: params.userId,
        status: "COMPLETED",
      };
    }
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
  if (params?.pathname) {
    revalidatePath(params?.pathname);
  }
  return {
    reservations: safeReservations || [],
    pagination,
  } as reservertionReturnDataType;
}
