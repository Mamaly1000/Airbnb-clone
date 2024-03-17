import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { includes, without } from "lodash"; 
import { NotificationTypes } from "../../reservations/route";

interface IParams {
  listing_id?: string;
}
export async function PATCH(
  _request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error(
      "You must login or register to an account for doing this action!"
    );
  }
  const { listing_id } = params;
  if (!listing_id || typeof listing_id !== "string") {
    throw new Error("Invalid Id");
  }
  const targetListing = await prisma.listing.findUnique({
    where: {
      id: listing_id,
    },
  });
  if (!targetListing) {
    return NextResponse.error();
  }
  const isLiked = includes(currentUser.favoriteIds, listing_id);
  let favorites: string[] = [];
  if (!isLiked) {
    favorites = [...currentUser.favoriteIds, listing_id];
    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds: favorites,
      },
    });
    try {
      await prisma.notification.create({
        data: {
          userId: targetListing.userId,
          listingId: targetListing.id,
          type: NotificationTypes.LIKE_LISTING,
          title: `${currentUser.name} liked your listing.`,
          actionUserId: currentUser.id,
        },
      });
      await prisma.user.update({
        where: {
          id: targetListing.userId,
        },
        data: {
          hasNotification: true,
        },
      });
    } catch (error) {
      console.log("error in creaing notification for liking a listing");
    }
    return NextResponse.json({ user, message: "thanks for your like!" });
  } else {
    favorites = without(currentUser.favoriteIds, listing_id);
    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds: favorites,
      },
    });
    try {
      await prisma.notification.create({
        data: {
          userId: targetListing.userId,
          listingId: targetListing.id,
          type: NotificationTypes.DISLIKE_LISTING,
          title: `${currentUser.name} disLiked your listing.`,
          actionUserId: currentUser.id,
        },
      });
      await prisma.user.update({
        where: {
          id: targetListing.userId,
        },
        data: {
          hasNotification: true,
        },
      });
    } catch (error) {
      console.log("error in creaing notification for liking a dislisting");
    }
    return NextResponse.json({ user, message: "like removed!" });
  }
}
