"use server";
import prisma from "@/libs/prismadb";
export type ListingQueryType = {
  userId?: string | undefined;
  roomCount?: number | undefined;
  bathroomCount?: number | undefined;
  guestCount?: number | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  category?: string | undefined;
  locationValue?: string | undefined;
  page?: number | undefined;
  favorites?: boolean | undefined;
  userFavoritesListings?: string[];
  type?: "ALL";
};
export default async function getListings(params?: ListingQueryType) {
  let query: any = {};
  const limit = 10;
  const page = params?.page || 1;
  const skip = (page - 1) * limit; // Pr
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
      favorites,
      userFavoritesListings,
    } = params!;
    if (favorites) {
      query = {
        id: {
          in: userFavoritesListings,
        },
      };
    }

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

  const totalListings = await prisma.listing.count({
    where: query,
  });
  const maxPages = Math.ceil(totalListings / limit);

  const listings = await prisma.listing.findMany({
    where: query,
    orderBy: {
      createdAt: "desc",
    },
    skip: params?.type === "ALL" ? 0 : skip,
    take: params?.type === "ALL" ? totalListings : limit + 1,
  });

  const isNextPage = listings.length > limit; // Check if there are more items than the limit
  if (isNextPage) {
    listings.pop();
  }
  const safeListings = listings.map((listing) => ({
    ...listing,
    createdAt: listing.createdAt.toISOString(),
  }));

  return {
    listings: safeListings || [],
    pagination: {
      hasMore: params?.type === "ALL" ? false : isNextPage,
      maxPages: params?.type === "ALL" ? 1 : maxPages,
      total: totalListings,
    },
  };
}
