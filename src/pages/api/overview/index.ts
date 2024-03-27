import { AnalyticsCategoryTypes } from "@/hooks/useAnalytics";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { OverviewType } from "@/types/OverviewType";

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
        category,
        listingId,
      }: { listingId?: string; category?: AnalyticsCategoryTypes } = req.query;
      let overviewData: OverviewType[] = [];
      if (category) {
        if (category === "FEEDBACK") {
          const feedbacks = await prisma.feedback.findMany({
            where: {
              listing: {
                userId: currentUser.currentUser.id,
              },
            },
          });

          const averageRating =
            feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0) /
            feedbacks.length;
          const totalReviews = feedbacks.length;
          const uniqueUsers = new Set(
            feedbacks.map((feedback) => feedback.userId)
          ).size;

          overviewData = [
            { label: "Average Rating", value: averageRating, iconType: "star" },
            {
              label: "Total Reviews",
              value: totalReviews,
              iconType: "star",
            },
            {
              label: "Total Users Rating",
              value: uniqueUsers,
              iconType: "user",
            },
          ];
        }
        if (category === "LISTING") {
          const listings = await prisma.listing.findMany({
            where: { userId: currentUser.currentUser.id },
          });
          const reservations = await prisma.reservation.findMany({
            where: {
              listing: {
                userId: currentUser.currentUser.id,
              },
            },
          });

          const averagePrice =
            listings.reduce((acc, listing) => acc + listing.price, 0) /
            listings.length;
          const totalRevenue = reservations.reduce(
            (acc, reservation) => acc + reservation.totalPrice,
            0
          );
          const totalReservations = reservations.filter(
            (reservation) => reservation.listingId
          ).length;

          overviewData = [
            { label: "Average Price", value: averagePrice, iconType: "dollar" },
            { label: "Total Revenue", value: totalRevenue, iconType: "dollar" },
            {
              label: "Total Reservations",
              value: totalReservations,
              iconType: "calendar",
            },
          ];
        }
        if (category === "RESERVATION") {
          const reservations = await prisma.reservation.findMany({
            where: {
              listing: {
                userId: currentUser.currentUser.id,
              },
            },
          });

          const totalReservations = reservations.length;
          const totalRevenue = reservations.reduce(
            (acc, reservation) => acc + reservation.totalPrice,
            0
          );
          const completedReservations = reservations.filter(
            (reservation) => reservation.status === "COMPLETED"
          ).length;
          overviewData = [
            {
              label: "Total Reservations",
              value: totalReservations,
              iconType: "calendar",
            },
            { label: "Total Revenue", value: totalRevenue, iconType: "dollar" },
            {
              label: "Completed Reservations",
              value: completedReservations,
              iconType: "check-circle",
            },
            // Add more data points as needed
          ];
        }
        if (category === "SINGLE_LISTING" && listingId) {
        }
        if (category === "MAIN") {
          const feedbacks = await prisma.feedback.findMany({
            where: {
              listing: {
                userId: currentUser.currentUser.id,
              },
            },
          });
          const reservations = await prisma.reservation.findMany({
            where: {
              listing: {
                userId: currentUser.currentUser.id,
              },
            },
          });
          const totalReservations = reservations.filter(
            (reservation) => reservation.listingId
          ).length;
          const averageRating =
            feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0) /
            feedbacks.length;
          const ratingPercentage = (averageRating / 5) * 100;
          const totalRevenue = reservations
            .filter((r) => r.status === "COMPLETED")
            .reduce((acc, reservation) => acc + reservation.totalPrice, 0);
          const reservationPercentage =
            (totalRevenue /
              reservations.reduce(
                (acc, reservation) => acc + reservation.totalPrice,
                0
              )) *
            100;
          const completedReservations = reservations.filter(
            (reservation) => reservation.status === "COMPLETED"
          ).length;
          overviewData = [
            {
              label: "Total Revenue",
              value: totalRevenue,
              iconType: "dollar",
              color: "#4BAEA0",
              percentage: reservationPercentage,
              isMoney: true,
            },
            {
              label: "Total Reservations",
              value: totalReservations,
              iconType: "calendar",
              color: "#9B59B6",
              percentage: reservationPercentage,
            },
            {
              label: "Average Rating",
              value: averageRating,
              iconType: "star",
              color: "yellow",
              percentage: ratingPercentage,
            },
            {
              label: "Completed Reservations",
              value: completedReservations,
              iconType: "check-circle",
              color: "#59D5E0",
              percentage:
                (reservations.filter((r) => r.status === "COMPLETED").length /
                  reservations.length) *
                100,
            },
          ];
        }
      }
      return res.status(200).json(overviewData);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error in getting overview" });
  }
}
