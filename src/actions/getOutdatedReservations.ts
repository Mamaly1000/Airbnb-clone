"use server";
import prisma from "@/libs/prismadb";

export default async function getOutdatedReservations(id?: string) {
  if (!id || typeof id !== "string") {
    console.log("invalid id for showing outdated reservations");
  }

  const outdatedReservations = await prisma.reservation.findMany({
    where: {
      userId:    id,
      endDate: {
        lt: new Date(), // Filter for reservations where the endDate is in the past
      },
    },
    include: {
      listing: true, // Include the listing information for each reservation
    },
  });

  return { reservations: outdatedReservations || [] };
}
