"use server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export async function getListingsById() {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }
  const listings = await prisma.listing.findMany({
    where: {
      id: user.id,
    },
  });

  const safeListings = listings.map((listing) => ({
    ...listing,
    createdAt: listing.createdAt.toISOString(),
  }));
  return safeListings;
}
