"use server";
import prisma from "@/libs/prismadb";
import { safeListingType } from "@/types/safeListing";
import { safeUserType } from "@/types/safeuser";

export async function getListingById(id?: string) {
  if (!id) {
    return null;
  }
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
  if (!listing) {
    return null;
  }
  return {
    ...listing,
    createdAt: listing.createdAt.toISOString(),
    user: {
      ...listing.user,
      createdAt: listing.user.createdAt?.toISOString(),
      updatedAt: listing.user.updatedAt?.toISOString(),
      emailVerified: listing.user.emailVerified?.toDateString() || null,
    },
  } as safeListingType & {
    user: safeUserType;
  };
}
