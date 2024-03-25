import { SingleAnalyticType } from "@/hooks/useAnalytics";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { ChartValueType } from "@/types/ChartTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).end();
  }
  try {
    const user = await serverAuth(req, res);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    const { topic }: { topic?: SingleAnalyticType } = req.query;
    let results: ChartValueType | null = null;
    if (topic) {
      // listings-chart-data
      if (topic === "LISTING_CATEGORY_COUNT") {
        const result = await prisma.listing.groupBy({
          by: ["category"],
          _count: { id: true },
        });

        results = {
          legend: "total listings",
          type: "LISTING_CATEGORY_COUNT",
          data: result.map((item) => ({
            label: item.category,
            value: item._count.id,
            id: item.category,
          })),
        };
      }
      if (topic === "LISTING_CATEGORY_PRICE") {
        const result = await prisma.listing.groupBy({
          by: ["category"],
          _avg: { price: true },
        });

        results = {
          data: result.map((item) => ({
            label: item.category,
            value: item._avg.price || 0,
            id: item.category,
          })),
          legend: "average properties price",
          type: "LISTING_CATEGORY_PRICE",
        };
      }
      if (topic === "LISTING_ENTITIES_COUNT") {
        const result = await prisma.listing.findMany({
          where: { userId: user.currentUser.id },
          select: {
            bathroomCount: true,
            id: true,
            guestCount: true,
            roomCount: true,
            title: true,
            category: true,
          },
        });
        results = {
          legend: "",
          type: "LISTING_ENTITIES_COUNT",
          data: result.map((i) => ({
            id: i.id,
            label: i.category,
            bathroomCount: i.bathroomCount,
            guestCount: i.guestCount,
            roomCount: i.roomCount,
            title: i.title,
          })),
        };
      }
      if (topic === "LISTING_LOCATION_COUNT") {
        const result = await prisma.listing.groupBy({
          by: ["locationValue"],
          _count: { id: true },
        });
        results = {
          legend: "total properties",
          type: "LISTING_LOCATION_COUNT",
          data: result.map((r) => ({
            id: r.locationValue,
            label: r.locationValue,
            value: r._count.id,
          })),
        };
      }
      if (topic === "LISTING_RATE_AVERAGE") {
        const result = await prisma.listing.findMany({
          where: {
            userId: user.currentUser.id,
          },
          select: {
            id: true,
            title: true,
            rate: true,
          },
        });
        results = {
          legend: "listings average ratings",
          type: "LISTING_RATE_AVERAGE",
          data: result.map((i) => ({
            label: i.title,
            value: i.rate,
            id: i.id,
          })),
        };
      }
      if (topic === "LISTING_VIEWS_COUNT") {
        const result = await prisma.listing.findMany({
          where: {
            userId: user.currentUser.id,
          },
          select: {
            id: true,
            title: true,
            views: true,
          },
        });
        results = {
          legend: "average properties views",
          type: "LISTING_VIEWS_COUNT",
          data: result.map((i) => ({
            label: i.title,
            value: i.views.length,
            id: i.id,
          })),
        };
      }
      // feedbacks-chart-data
      if (topic === "FEEDBACK_USERS_AVERAGE") {
      }
      if (topic === "FEEDBACK_LISTING_COUNT") {
      }
      if (topic === "FEEDBACK_RATE_COUNT") {
      }
      if (topic === "FEEDBACK_TOTAL_AVERAGE") {
      }
      // reservations-chart-data
      if (topic === "RESERVATION_CREATED_COUNT") {
      }
      if (topic === "RESERVATION_DATE_TOTALPRICE") {
      }
      if (topic === "RESERVATION_REVENUE_COUNT") {
      }
      if (topic === "RESERVATION_STATUS") {
      }
      if (topic === "RESERVATION_USER_COUNT") {
      }
    }
    return res.status(200).json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error in getting chart data" });
  }
}
