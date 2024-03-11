"use client";
import React from "react";
import { safeListingType } from "../../types/safeListing";
import { safeUserType } from "../../types/safeuser";
import Container from "../ui/Container";
import Heading from "../form/Heading";
import ListingCard from "../card/ListingCard";

const FavoritesClient = ({
  favorites,
  user,
}: {
  favorites: safeListingType[];
  user?: safeUserType | null;
}) => {
  return (
    <Container main classname="min-w-full max-w-full">
      <Heading title="Favorites" subtitle="List of your favorite places!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favorites.map((favorite) => {
          return (
            <ListingCard listing={favorite} key={favorite.id} user={user} />
          );
        })}
      </div>
    </Container>
  );
};

export default FavoritesClient;
