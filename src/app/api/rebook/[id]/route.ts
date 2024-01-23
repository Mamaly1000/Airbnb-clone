import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(
  requst: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const { totalPrice, startDate, endDate, listingId } = await requst.json();
  if (!totalPrice || !startDate || !endDate || !listingId) {
    return NextResponse.error();
  }
  const reservationId = params.id as string;
  if (!reservationId || typeof reservationId !== "string") {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        update: {
          where: {
            id: reservationId,
          },
          data: {
            endDate: endDate,
            startDate: startDate,
            totalPrice: totalPrice,
            userId: currentUser.id,
          },
        },
      },
    },
  });
  if (!listingAndReservation) {
    return NextResponse.error();
  }
  return NextResponse.json({
    message: "reservation updated",
    listingAndReservation,
  });
}
