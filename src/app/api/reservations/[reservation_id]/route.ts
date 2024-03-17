import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { format } from "date-fns"; 
import { NotificationTypes } from "@/types/notificationstype";

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
  _request: Request,
  { params }: { params: { reservation_id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.error();
  }
  if (!params.reservation_id || typeof params.reservation_id !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prisma.reservation.delete({
    where: {
      id: params.reservation_id,
    },
  });
  const targetListing = await prisma.listing.findUnique({
    where: { id: reservation.listingId },
  });
  if (!targetListing || !reservation) {
    return NextResponse.error();
  }
  try {
    await prisma.notification.createMany({
      data:
        user.id !== targetListing.userId
          ? [
              {
                userId: targetListing.userId,
                type: NotificationTypes.CANCEL_RESERVATION,
                actionUserId: user.id,
                listingId: targetListing.id,
                message: `${user.name} cancel reservation between ${format(
                  reservation.startDate,
                  "yyyy/mm/dd-hh:mm"
                )} and ${format(reservation.endDate, "yyyy/mm/dd-hh:mm")}`,
                reservationId: reservation.id,
                title: `${user.name} cancel reservation for ${targetListing.title}`,
                totalAmount: reservation.totalPrice,
              },
              {
                userId: user.id,
                type: NotificationTypes.CANCEL_RESERVATION,
                actionUserId: user.id,
                listingId: targetListing.id,
                message: `you cancel reservation between ${format(
                  reservation.startDate,
                  "yyyy/mm/dd hh:mm"
                )} and ${format(reservation.endDate, "yyyy/mm/dd hh:mm")}`,
                reservationId: reservation.id,
                title: `you cancel reservation for ${targetListing.title}`,
                totalAmount: reservation.totalPrice,
              },
            ]
          : [
              {
                userId: user.id,
                type: NotificationTypes.CANCEL_RESERVATION,
                actionUserId: user.id,
                listingId: targetListing.id,
                message: `you cancel reservation between ${format(
                  reservation.startDate,
                  "yyyy/mm/dd hh:mm"
                )} and ${format(reservation.endDate, "yyyy/mm/dd hh:mm")}`,
                reservationId: reservation.id,
                title: `you cancel reservation for ${targetListing.title}`,
                totalAmount: reservation.totalPrice,
              },
            ],
    });
    await prisma.user.updateMany({
      where: { id: { in: [targetListing.userId, user.id] } },
      data: { hasNotification: true },
    });
  } catch (error) {
    console.log("error in creating canceling notification ");
  }
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
    console.log("missing fields");
    return NextResponse.error();
  }
  const updatedReservation = await prisma.reservation.update({
    where: {
      id: params.reservation_id,
    },
    data: {
      endDate,
      startDate,
      totalPrice,
    },
  });
  if (!updatedReservation) {
    return NextResponse.error();
  }
  const targetListing = await prisma.listing.findUnique({
    where: { id: updatedReservation.listingId },
  });
  if (!targetListing) {
    return NextResponse.error();
  }
  try {
    await prisma.notification.createMany({
      data:
        targetListing.userId !== user.id
          ? [
              {
                userId: targetListing.userId,
                type: NotificationTypes.UPDATE_RESERVATION,
                actionUserId: user.id,
                listingId: targetListing.id,
                message: `${user.name} update reservation between ${format(
                  updatedReservation.startDate,
                  "yyyy/mm/dd-hh:mm"
                )} and ${format(
                  updatedReservation.endDate,
                  "yyyy/mm/dd-hh:mm"
                )}`,
                reservationId: updatedReservation.id,
                title: `${user.name} update reservation for ${targetListing.title}.`,
                totalAmount: updatedReservation.totalPrice,
              },
              {
                userId: user.id,
                type: NotificationTypes.UPDATE_RESERVATION,
                actionUserId: user.id,
                listingId: targetListing.id,
                message: `you update reservation between ${format(
                  updatedReservation.startDate,
                  "yyyy/mm/dd-hh:mm"
                )} and ${format(
                  updatedReservation.endDate,
                  "yyyy/mm/dd-hh:mm"
                )}`,
                reservationId: updatedReservation.id,
                title: `you update reservation for ${targetListing.title}.`,
                totalAmount: updatedReservation.totalPrice,
              },
            ]
          : [
              {
                userId: user.id,
                type: NotificationTypes.UPDATE_RESERVATION,
                actionUserId: user.id,
                listingId: targetListing.id,
                message: `you update reservation between ${format(
                  updatedReservation.startDate,
                  "yyyy/mm/dd-hh:mm"
                )} and ${format(
                  updatedReservation.endDate,
                  "yyyy/mm/dd-hh:mm"
                )}`,
                reservationId: updatedReservation.id,
                title: `you update reservation for ${targetListing.title}.`,
                totalAmount: updatedReservation.totalPrice,
              },
            ],
    });
    await prisma.user.updateMany({
      where: { id: { in: [targetListing.userId, user.id] } },
      data: { hasNotification: true },
    });
  } catch (error) {
    console.log("error in creating updating notification ");
  }

  return NextResponse.json({
    updatedReservation,
    message: "reservation updated!",
  });
}
