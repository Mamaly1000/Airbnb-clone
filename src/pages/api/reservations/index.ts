import prisma from "@/libs/prismadb"; 
import { format } from "date-fns";
import { NotificationTypes } from "@/types/notificationstype";
import { NextApiRequest, NextApiResponse } from "next";
import { Reservation } from "@prisma/client";
import serverAuth from "@/libs/serverAuth";
import { reservationSortTypes } from "@/types/reservationTypes";
import { reservationStatusTypes } from "@/hooks/useReservations";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    if (req.method === "GET") {
      const currentUser = await serverAuth(req, res);
      if (!currentUser) {
        return res.status(401).json({ message: "unAuthorized!" });
      }
      const {
        listingId,
        max,
        min,
        page,
        paginate = "true",
        sortType = "desc",
        type,
        userId,
        sort,
        endDate,
        startDate,
      }: {
        sort?: reservationSortTypes;
        page?: number;
        min?: string;
        max?: string;
        userId?: string;
        sortType?: "asc" | "desc";
        listingId?: string;
        type?: reservationStatusTypes;
        paginate?: string;
        startDate?: string;
        endDate?: string;
      } = req.query;
      let where: any = {};
      let orderBy: any = {
        createdAt: sortType,
      };
      let include = {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        listing: true,
      };
      if (listingId) {
        where.listingId = listingId;
      }
      if (!!max && !!min) {
        where.totalPrice = {
          gte: +min,
          lte: +max,
        };
      }
      if (userId) {
        where.userId = userId;
      }
      if (endDate && startDate) {
        where = {
          ...where,
          startDate: {
            gte: startDate,
          },
          endDate: {
            lte: endDate,
          },
        };
      }
      if (type && type !== "ALL") {
        where.status = type;
      }
      if (sort) {
        if (sort === "CREATED_AT") {
          orderBy = {
            createdAt: sortType,
          };
        }
        if (sort === "END_DATE") {
          orderBy = {
            endDate: sortType,
          };
        }
        if (sort === "LISTING_NAME") {
          orderBy = {
            listing: {
              title: sortType,
            },
          };
        }
        if (sort === "START-DATE") {
          orderBy = {
            startDate: sortType,
          };
        }
        if (sort === "STATUS") {
          orderBy = {
            status: sortType,
          };
        }
        if (sort === "TOTAL_AMOUNT") {
          orderBy = {
            totalPrice: sortType,
          };
        }
        if (sort === "USER_NAME") {
          orderBy = {
            user: {
              name: sortType,
            },
          };
        }
      }
      let reservations: Reservation[] = [];
      const limit = 10;
      const currentPage = +(page || 1);
      const skip = (currentPage - 1) * limit;
      const totalReservations = await prisma.reservation.count({ where });
      const totalPages = Math.ceil(totalReservations / limit);
      if (paginate === "true") {
        reservations = await prisma.reservation.findMany({
          where: {
            ...where,
            listing: {
              userId: currentUser.currentUser.id,
            },
          },
          orderBy,
          skip,
          take: limit + 1,
          include,
        });
      }
      if (paginate === "false") {
        reservations = await prisma.reservation.findMany({
          where,
          orderBy,
          include,
        });
      }
      const hasMore = reservations.length > limit;
      if (hasMore) {
        reservations.pop();
      }
      return res.status(200).json({
        reservations,
        pagination: {
          hasMore,
          totalPages,
          totalReservations,
          currentPage,
          nextPage: currentPage + 1,
        },
      });
    }
    if (req.method === "POST") {
      const currentUser = await serverAuth(req, res);
      if (!currentUser) {
        return res.status(401).json({ message: "Unauthorized" });
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
          userId: currentUser.currentUser.id,
          listingId: listingId,
        },
      });
      if (!targetListing || !targetReservation) {
        return res.status(404).json({ message: "invalid id" });
      }
      try {
        await prisma.notification.createMany({
          data:
            currentUser.currentUser.id !== targetListing.userId
              ? [
                  {
                    userId: targetListing.userId,
                    type: NotificationTypes.BOOK_RESERVATION,
                    actionUserId: currentUser.currentUser.id,
                    listingId: targetListing.id,
                    message: `${
                      currentUser.currentUser.name
                    } book reservation between ${format(
                      targetReservation.startDate,
                      "yyyy/mm/dd-hh:mm"
                    )} and ${format(
                      targetReservation.endDate,
                      "yyyy/mm/dd-hh:mm"
                    )}`,
                    reservationId: targetReservation.id,
                    title: `${currentUser.currentUser.name} book new reservation for${targetListing.title}`,
                    totalAmount: targetReservation.totalPrice,
                  },
                  {
                    userId: currentUser.currentUser.id,
                    type: NotificationTypes.BOOK_RESERVATION,
                    actionUserId: currentUser.currentUser.id,
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
                    userId: currentUser.currentUser.id,
                    type: NotificationTypes.BOOK_RESERVATION,
                    actionUserId: currentUser.currentUser.id,
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
          where: {
            id: { in: [targetListing.userId, currentUser.currentUser.id] },
          },
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error in getting reservations" });
  }
}
