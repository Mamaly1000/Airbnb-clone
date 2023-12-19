import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { totalPrice, startDate, endDate, listingId } = body;
  if (!totalPrice || !startDate || !endDate || !listingId) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          endDate: endDate,
          startDate: startDate,
          totalPrice: totalPrice,
          userId: currentUser.id,
        },
      },
    },
  });

  return NextResponse.json({
    data: listingAndReservation,
    message: `you reserved ${listingAndReservation.title} from ${new Date(
      startDate
    ).toLocaleDateString()} untill ${new Date(endDate).toLocaleDateString()}`,
  });
}
