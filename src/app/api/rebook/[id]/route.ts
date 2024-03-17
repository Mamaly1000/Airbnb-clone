import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { format } from "date-fns"; 
import { NotificationTypes } from "@/types/notificationstype";

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
  const targetReservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
  });
  if (!targetReservation) {
    return NextResponse.error();
  }
  try {
    await prisma.notification.createMany({
      data:
        listingAndReservation.userId !== currentUser.id
          ? [
              {
                userId: listingAndReservation.userId,
                type: NotificationTypes.REBOOK_RESERVATION,
                actionUserId: currentUser.id,
                listingId: listingAndReservation.id,
                message: `${
                  currentUser.name
                } rebook reservation between ${format(
                  targetReservation.startDate,
                  "yyyy/mm/dd-hh:mm"
                )} and ${format(
                  targetReservation.endDate,
                  "yyyy/mm/dd-hh:mm"
                )}`,
                reservationId: targetReservation.id,
                title: `${currentUser.name} rebook reservation for ${listingAndReservation.title}`,
                totalAmount: targetReservation.totalPrice,
              },
              {
                userId: currentUser.id,
                type: NotificationTypes.REBOOK_RESERVATION,
                actionUserId: currentUser.id,
                listingId: listingAndReservation.id,
                message: `you rebook reservation between ${format(
                  targetReservation.startDate,
                  "yyyy/mm/dd-hh:mm"
                )} and ${format(
                  targetReservation.endDate,
                  "yyyy/mm/dd-hh:mm"
                )}`,
                reservationId: targetReservation.id,
                title: `you rebook reservation for ${listingAndReservation.title}`,
                totalAmount: targetReservation.totalPrice,
              },
            ]
          : [
              {
                userId: currentUser.id,
                type: NotificationTypes.REBOOK_RESERVATION,
                actionUserId: currentUser.id,
                listingId: listingAndReservation.id,
                message: `you rebook reservation between ${format(
                  targetReservation.startDate,
                  "yyyy/mm/dd-hh:mm"
                )} and ${format(
                  targetReservation.endDate,
                  "yyyy/mm/dd-hh:mm"
                )}`,
                reservationId: targetReservation.id,
                title: `you rebook reservation for ${listingAndReservation.title}`,
                totalAmount: targetReservation.totalPrice,
              },
            ],
    });
    await prisma.user.updateMany({
      where: { id: { in: [listingAndReservation.userId, currentUser.id] } },
      data: { hasNotification: true },
    });
  } catch (error) {
    console.log("error in creating rebook notification ");
  }
  return NextResponse.json({
    message: "reservation updated",
    listingAndReservation,
  });
}
