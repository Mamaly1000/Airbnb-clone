import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import FavoritesClient from "@/components/Favorites/FavoritesClient";
import EmptyState from "@/components/ui/EmptyState";
import React from "react";

const Favorites = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <EmptyState
        title="Unauthorized!"
        subTitle="Please login to your account."
      />
    );
  }
  const { listings, pagination } = await getListings({
    favorites: true,
    userFavoritesListings: user.favoriteIds,
  });
  return (
    <FavoritesClient
      params={{
        favorites: true,
        userFavoritesListings: user.favoriteIds,
      }}
      pagination={pagination}
      favorites={listings}
      user={user}
    />
  );
};

export default Favorites;
