import getCurrentUser from "@/actions/getCurrentUser";
import { getfavorites } from "@/actions/getFavorites";
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
  const favorites = await getfavorites();
  if (!favorites || favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites found!"
        subTitle="Looks like you have no favorites listings."
      />
    );
  }
  return <FavoritesClient favorites={favorites} user={user} />;
};

export default Favorites;
