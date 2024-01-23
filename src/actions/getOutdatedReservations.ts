"use server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getOutdatedReservations(params?: {
  outherId?: string;
}) {
  let query: any = {
    endDate: {
      lt: new Date(),
    },
  };
  const user = await getCurrentUser();
  if (!user) {
    return { reservations: [] };
  }

  if (params && params.outherId) {
    query = {
      ...query,
      listing: {
        userId: params?.outherId,
      },
    };
  } else {
    query = { ...query, userId: user.id };
  }

  const outdatedReservations = await prisma.reservation.findMany({
    where: query,
    include: {
      listing: true,
    },
  }); 

  return { reservations: outdatedReservations || [] };
}
