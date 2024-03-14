"use client";
import { safeListingType } from "@/types/safeListing";
import { safeUserType } from "@/types/safeuser";
import React, { useMemo } from "react";
import { categories } from "../categories/Categories";
import Container from "../ui/Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import ListingReservation from "./ListingReservation";
import { safeReservationType } from "@/types/safeReservation";
import { motion } from "framer-motion";
import ListingReviews from "./ListingReviews";
import RelatedListings from "./RelatedListings";
export const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ListingClient = ({
  listing,
  user,
  reservations = [],
  reviews,
  relatedListings,
}: {
  relatedListings: safeListingType[];
  reviews?: any;
  listing: safeListingType & {
    user: safeUserType;
  };
  user?: safeUserType | null;
  reservations?: safeReservationType[];
}) => {
  const category = useMemo(() => {
    if (listing.category)
      return categories.find((c) => c.label === listing.category);
  }, [listing.category]);
  return (
    <Container main classname="min-w-full max-w-full pt-32 overflow-x-visible">
      <div className="max-w-screen-lg mx-auto flex flex-col gap-6  overflow-x-visible">
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
        <motion.div
          initial={{ opacity: 0, translateX: -100 }}
          whileInView={{ opacity: 1, translateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6 max-w-full overflow-hidden"
        >
          <ListingInfo
            listing={{
              user: listing.user,
              category: category,
              description: listing.description,
              roomCount: listing.roomCount,
              guestCount: listing.guestCount,
              bathroomCount: listing.bathroomCount,
              locationVlaue: listing.locationValue,
              id: listing.id,
              rate: listing.rate,
            }}
            user={user}
          />
          <motion.div
            initial={{ opacity: 0, translateX: 100 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="order-first mb-10 md:order-last md:col-span-3 max-w-full overflow-hidden"
          >
            <ListingReservation
              listing={listing}
              reservations={reservations}
              user={user}
            />
          </motion.div>
        </motion.div>
        <ListingReviews listingId={listing.id} reviewsData={reviews} />
      </div>
        <RelatedListings
          category={listing.category}
          listings={relatedListings}
        />
    </Container>
  );
};

export default ListingClient;
