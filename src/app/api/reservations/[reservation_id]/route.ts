import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { reservation_id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.redirect("/");
  }
  const id = params.reservation_id as string;
  if (!id || typeof id !== "string") {
    return NextResponse.error();
  }
  const reservation = await prisma.reservation.findUnique({
    where: {
      id,
    },
    include: {
      listing: true,
      user: true,
    },
  });
  if (!reservation) {
    return NextResponse.error();
  }
  return NextResponse.json(reservation);
}

export async function DELETE(
  request: Request,
  { params }: { params: { reservation_id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.error();
  }
  if (!params.reservation_id || typeof params.reservation_id !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: params.reservation_id,
      OR: [
        { userId: user.id },
        {
          listing: {
            userId: user.id,
          },
        },
      ],
    },
  });

  return NextResponse.json({ reservation, message: `Reservation Deleted!` });
}
export async function PATCH(
  request: Request,
  { params }: { params: { reservation_id: string } }
) {
  const body = await request.json();
  const { totalPrice, startDate, endDate, listingId } = body;
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.error();
  }
  if (!totalPrice || !startDate || !endDate || !listingId) {
    return NextResponse.error();
  }
  const updatedReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        update: {
          where: {
            id: params.reservation_id as string,
          },
          data: {
            endDate,
            startDate,
            totalPrice,
            userId: user.id,
          },
        },
      },
    },
  });

  return NextResponse.json({
    updatedReservation,
    message: "reservation updated!",
  });
}
