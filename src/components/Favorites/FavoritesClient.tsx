"use client";
import React from "react";
import { safeListingType } from "../../types/safeListing";
import { safeUserType } from "../../types/safeuser";
import ListingList from "../lists/ListingList";
import ListingLoadMore from "../pagination/ListingLoadMore";

const FavoritesClient = ({
  favorites,
  user,
  params,
  pagination,
}: {
  pagination: {
    hasMore: boolean;
    maxPages: number;
    total: number;
  };
  params?: { favorites?: boolean; userFavoritesListings?: string[] };
  favorites: safeListingType[];
  user?: safeUserType | null;
}) => {
  return (
    <>
      <ListingList
        main
        className="pt-32"
        listings={favorites}
        user={user}
        pagination={pagination}
        emptyState={{
          title: "No favorites found!",
          subTitle: "Looks like you have no favorites listings.",
        }}
        header={{
          title: "Favorites",
          subTitle: "List of your favorite places!",
        }}
      />
      <ListingLoadMore
        favoritePage
        pagination={pagination}
        user={user!}
        params={params}
      />
    </>
  );
};

export default FavoritesClient;
