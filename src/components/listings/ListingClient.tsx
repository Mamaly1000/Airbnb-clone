"use client";
import { safeListingType } from "@/types/safeListing";
import { safeUserType } from "@/types/safeuser";
import { Reservation } from "@prisma/client";
import React, { useMemo } from "react";
import { categories } from "../categories/Categories";
import Container from "../ui/Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";

const ListingClient = ({
  listing,
  user,
  reservations,
}: {
  listing: safeListingType & {
    user: safeUserType;
  };
  user?: safeUserType | null;
  reservations?: Reservation;
}) => {
  const category = useMemo(() => {
    if (listing.category)
      return categories.find((c) => c.label === listing.category);
  }, [listing.category]);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto flex flex-col gap-6">
        <ListingHead
          listing={{
            title: listing.title,
            image: listing.imageSrc,
            locationValue: listing.locationValue,
            id: listing.id,
            user: listing.user,
          }}
          user={user}
        />
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
          <ListingInfo
            listing={{
              user: listing.user,
              category: category,
              description: listing.description,
              roomCount: listing.roomCount,
              guestCount: listing.guestCount,
              bathroomCount: listing.bathroomCount,
              locationVlaue: listing.locationValue,
            }}
            user={user}
          />
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
