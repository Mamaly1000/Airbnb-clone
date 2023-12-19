"use server";
import prisma from "@/libs/prismadb";
import { safeListingType } from "@/types/safeListing";
import { Listing } from "@prisma/client";
export default async function getListings() {
  try {
    const listings: Listing[] = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    })) as safeListingType[];
  } catch (error: any) {
    throw new Error(error);
  }
}
