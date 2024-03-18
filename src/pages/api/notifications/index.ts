import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import {
  NotificationFilterTypes,
  NotificationSortTypes,
} from "@/hooks/useNotifications";
import { NotificationTypes } from "@/types/notificationstype";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const currentUser = await serverAuth(req, res);
    if (!currentUser) {
      return res.status(401).json({ message: "unAuthorized!" });
    }
    const {
      search,
      sort,
      filter,
      page,
    }: {
      search?: string;
      sort?: NotificationSortTypes;
      filter?: NotificationFilterTypes;
      page?: string;
    } = req.query;
    let where: any = {
      userId: currentUser.currentUser.id,
    };
    let orderBy: any = {
      createdAt: "desc",
    };

    if (sort) {
      if (sort === "LOW AMOUNT") {
        orderBy = {
          totalAmount: "asc",
        };
      }
      if (sort === "TOP AMOUNT") {
        orderBy = {
          totalAmount: "desc",
        };
      }
      if (sort === "NEWEST") {
        orderBy = {
          createdAt: "desc",
        };
      }
      if (sort === "OLDEST") {
        orderBy = {
          createdAt: "asc",
        };
      }
    }
    if (filter) {
      if (filter === "BOOKING") {
        where.type = NotificationTypes.BOOK_RESERVATION;
      }
      if (filter === "CANCELING") {
        where.type = NotificationTypes.CANCEL_RESERVATION;
      }
      if (filter === "COMPLETED-RESERVATIONS") {
        where.type = NotificationTypes.COMPLETE_RESERVATION;
      }
      if (filter === "DISLIKING") {
        where.type = NotificationTypes.DISLIKE_LISTING;
      }
      if (filter === "LIKING") {
        where.type = NotificationTypes.LIKE_LISTING;
      }
      if (filter === "REBOOKING") {
        where.type = NotificationTypes.REBOOK_RESERVATION;
      }
      if (filter === "REVIEW") {
        where.type = NotificationTypes.REVIEW_RESERVATION;
      }
      if (filter === "UPDATING") {
        where.type = NotificationTypes.UPDATE_RESERVATION;
      }
      if (filter === "SEEN") {
        where.read = true;
      }
      if (filter === "UNSEEN") {
        where.read = false;
      }
    }
    if (search) {
      where = {
        ...where,
        OR: [
          { title: { contains: search } },
          { message: { contains: search } },
          { title: { startsWith: search } },
          { message: { startsWith: search } },
          { title: { endsWith: search } },
          { message: { endsWith: search } },
        ],
      };
    }
    const limit = 10;
    const currentPage = +(page || 1);
    const skip = (currentPage - 1) * limit;

    const totalNotifications = await prisma.notification.count({ where });
    const maxPages = Math.ceil(totalNotifications / limit);
    const notifications = await prisma.notification.findMany({
      where,
      include: {
        actionUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        reservation: true,
      },
      orderBy,
      take: limit + 1,
      skip,
    });
    const hasMore = notifications.length > limit;
    if (hasMore) {
      notifications.pop();
    }
    return res.status(200).json({
      notifications,
      pagination: {
        hasMore,
        maxPages,
        total: totalNotifications,
        nextPage: currentPage + 1,
        page: currentPage,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error in getting notifications" });
  }
}
