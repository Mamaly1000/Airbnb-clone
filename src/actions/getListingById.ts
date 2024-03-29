"use server";
import prisma from "@/libs/prismadb";
import { safeListingType } from "@/types/safeListing";
import { safeUserType } from "@/types/safeuser";
import getCurrentUser from "./getCurrentUser";

export async function getListingById(id?: string) {
  const user = await getCurrentUser();
  if (!id) {
    return null;
  }
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });

  if (!listing || !user) {
    return null;
  }

  try {
    await prisma.listingView.create({
      data: {
        listingId: listing.id,
        viewerId: user.id,
      },
    });
  } catch (error) {
    console.log(error);
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
