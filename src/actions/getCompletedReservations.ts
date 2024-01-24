"use server";
import prisma from "@/libs/prismadb";
import { Listing, Reservation, User } from "@prisma/client";

export async function getCompletedReservations(params?: {
  userId?: string;
  listingId?: string;
  authorId?: string;
  status: "COMPLETED";
}) {
  let query: any = {
    listingId: params?.listingId,
  };
  if (params) {
    if (params.authorId) {
      query = {
        ...query,
        listing: {
          userId: params.authorId,
        },
      };
    }
    if (params.userId) {
      query = {
        ...query,
        userId: params.userId,
      };
    }
  }

  const reservations = await prisma.reservation.findMany({
    where: query,
    include: {
      listing: true,
      user: true,
    },
  });

  return (reservations || []) as Array<
    Reservation & {
      user: User;
      listing: Listing;
    }
  >;
}
