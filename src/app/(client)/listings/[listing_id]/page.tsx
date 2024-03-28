import getCurrentUser from "@/actions/getCurrentUser";
import { getFeedbacks } from "@/actions/getFeedbacks";
import { getListingById } from "@/actions/getListingById";
import getListings from "@/actions/getListings";
import { getReservations } from "@/actions/getReservations";
import ListingClient from "@/components/listings/ListingClient";
import EmptyState from "@/components/ui/EmptyState";
import { isNull } from "lodash";
import React from "react";

export const revalidate = 0;

export default async function SingleListingPage({
  params,
}: {
  params: { listing_id: string };
}) {
  const user = await getCurrentUser();
  const { reservations } = await getReservations({ ...params, type: "ALL" });
  if (isNull(user)) {
    return (
      <EmptyState
        showReset
        subTitle="please login to your account!"
        title="unable to show details"
      />
    );
  }
  const listingData = await getListingById(params.listing_id);
  if (isNull(listingData)) {
    return (
      <EmptyState
        showReset
        subTitle="maybe there is no listing here to show!"
        title="unable to show details"
      />
    );
  }
  const reviewsData = await getFeedbacks({
    listingId: listingData?.id,
    limit: 5,
  });
  const { listings: relatedListing } = await getListings({
    category: listingData?.category,
    limit: 3,
    not: [listingData.id],
  });

  return (
    <ListingClient
      relatedListings={relatedListing}
      listing={listingData}
      user={user}
      reservations={reservations}
      reviews={reviewsData}
    />
  );
}
