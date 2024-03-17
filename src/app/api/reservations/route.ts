import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import { getReservations } from "@/actions/getReservations";
import { format } from "date-fns";

export enum NotificationTypes {
  REBOOK_RESERVATION,
  UPDATE_RESERVATION,
  CANCEL_RESERVATION,
  BOOK_RESERVATION,
  DISLIKE_LISTING,
  LIKE_LISTING,
  REVIEW_RESERVATION,
  COMPLETE_RESERVATION,
}

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
  const targetListing = await prisma.listing.findUnique({
    where: { id: listingId },
  });
  const targetReservation = await prisma.reservation.create({
    data: {
      endDate: endDate,
      startDate: startDate,
      totalPrice: totalPrice,
      userId: currentUser.id,
      listingId: listingId,
    },
  });
  if (!targetListing || !targetReservation) {
    return NextResponse.error();
  }
  try {
    await prisma.notification.createMany({
      data:
        currentUser.id !== targetListing.userId
          ? [
              {
                userId: targetListing.userId,
                type: NotificationTypes.BOOK_RESERVATION,
                actionUserId: currentUser.id,
                listingId: targetListing.id,
                message: `${currentUser.name} book reservation between ${format(
                  targetReservation.startDate,
                  "yyyy/mm/dd-hh:mm"
                )} and ${format(
                  targetReservation.endDate,
                  "yyyy/mm/dd-hh:mm"
                )}`,
                reservationId: targetReservation.id,
                title: `${currentUser.name} book new reservation for${targetListing.title}`,
                totalAmount: targetReservation.totalPrice,
              },
              {
                userId: currentUser.id,
                type: NotificationTypes.BOOK_RESERVATION,
                actionUserId: currentUser.id,
                listingId: targetListing.id,
                message: `you reserved ${targetListing.title} from ${format(
                  targetReservation.startDate,
                  "yyyy/mm/dd hh:mm"
                )} untill ${format(
                  targetReservation.endDate,
                  "yyyy/mm/dd hh:mm"
                )}`,
                reservationId: targetReservation.id,
                title: `you book a new reservation for ${targetListing.title}`,
                totalAmount: targetReservation.totalPrice,
              },
            ]
          : [
              {
                userId: currentUser.id,
                type: NotificationTypes.BOOK_RESERVATION,
                actionUserId: currentUser.id,
                listingId: targetListing.id,
                message: `you reserved ${targetListing.title} from ${format(
                  targetReservation.startDate,
                  "yyyy/mm/dd hh:mm"
                )} untill ${format(
                  targetReservation.endDate,
                  "yyyy/mm/dd hh:mm"
                )}`,
                reservationId: targetReservation.id,
                title: `you book a new reservation for ${targetListing.title}`,
                totalAmount: targetReservation.totalPrice,
              },
            ],
    });
    await prisma.user.updateMany({
      where: { id: { in: [targetListing.userId, currentUser.id] } },
      data: { hasNotification: true },
    });
  } catch (error) {
    console.log({ message: "error in creating booking notification ", error });
  }

  return NextResponse.json({
    message: `you reserved ${targetListing.title} from ${new Date(
      startDate
    ).toLocaleDateString()} untill ${new Date(endDate).toLocaleDateString()}`,
  });
}
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const listingId = searchParams.get("listingId") as string;
  if (!listingId || typeof listingId !== "string") {
    return NextResponse.error();
  }
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const { reservations } = await getReservations({
    listing_id: listingId,
    type: "ALL",
  });
  return NextResponse.json(reservations);
}
