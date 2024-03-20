import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import { getReservations } from "@/actions/getReservations";
import { format } from "date-fns";
import { NotificationTypes } from "@/types/notificationstype";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).end();
  }
  try {
  } catch (error) {
    if (req.method === "GET") {
      const { listingId } = req.query;
      if (!listingId || typeof listingId !== "string") {
        return res.status(404).end();
      }
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        return res.status(401).json({ message: "unAuthorized!" });
      }
      const { reservations } = await getReservations({
        listing_id: listingId,
        type: "ALL",
      });
      return res.status(200).json(reservations);
    }
    if (req.method === "POST") {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        return NextResponse.error();
      }
      const { totalPrice, startDate, endDate, listingId } = req.body;
      if (!totalPrice || !startDate || !endDate || !listingId) {
        return res.status(404).json({ message: "missing fields" });
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
        return res.status(404).json({ message: "invalid id" });
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
                    message: `${
                      currentUser.name
                    } book reservation between ${format(
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
        console.log({
          message: "error in creating booking notification ",
          error,
        });
      }

      return res.status(200).json({
        message: `you reserved ${targetListing.title} from ${new Date(
          startDate
        ).toLocaleDateString()} untill ${new Date(
          endDate
        ).toLocaleDateString()}`,
      });
    }
  }
}
