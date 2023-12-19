"use server";
import prisma from "@/libs/prismadb";
import { safeListingType } from "@/types/safeListing";
import { Listing } from "@prisma/client";
export default async function getListings(params?: {
  userId?: string;
  roomCount?: number;
  bathroomCount?: number;
  guestCount?: number;
  startDate?: string;
  endDate?: string;
  category?: string;
  locationValue?: string;
}) {
  try {
    let query: any = {};
    if (params) {
      const {
        userId,
        roomCount,
        guestCount,
        bathroomCount,
        startDate,
        endDate,
        category,
        locationValue,
      } = params!;
      if (userId) {
        query.userId = userId;
      }

      if (category) {
        query.category = category;
      }

      if (roomCount) {
        query.roomCount = {
          gte: +roomCount,
        };
      }

      if (guestCount) {
        query.guestCount = {
          gte: +guestCount,
        };
      }

      if (bathroomCount) {
        query.bathroomCount = {
          gte: +bathroomCount,
        };
      }

      if (locationValue) {
        query.locationValue = locationValue;
      }

      if (startDate && endDate) {
        query.NOT = {
          reservations: {
            some: {
              OR: [
                {
                  endDate: { gte: startDate },
                  startDate: { lte: startDate },
                },
                {
                  startDate: { lte: endDate },
                  endDate: { gte: endDate },
                },
              ],
            },
          },
        };
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    console.log(error);
  }
}
