"use server";
import prisma from "@/libs/prismadb";
import { safeReservationType } from "@/types/safeReservation";

export async function getReservations({
  authorId,
  listing_id,
  userId,
}: {
  listing_id?: string;
  userId?: string;
  authorId?: string;
}) {
  try {
    const query: any = {
      endDate: {
        gte: new Date(),
      },
      status: "PENDING",
    };
    if (listing_id) {
      query.listingId = listing_id;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservation = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

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
    return safeReservations as safeReservationType[];
  } catch (error: any) {
    throw new Error(error);
  }
}
