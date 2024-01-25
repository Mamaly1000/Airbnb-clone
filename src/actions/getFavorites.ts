"use server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export async function getfavorites() {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }
  const favorites = await prisma.listing.findMany({
    where: {
      id: {
        in: [...(user.favoriteIds || [])],
      },
    },
  });
  const safeFavorites = favorites.map((fav) => ({
    ...fav,
    createdAt: fav.createdAt.toISOString(),
  }));
  return safeFavorites;
}
