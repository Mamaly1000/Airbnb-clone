import getCurrentUser from "@/actions/getCurrentUser";
import { getFeedbacks } from "@/actions/getFeedbacks";
import { getListingById } from "@/actions/getListingById";
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
  const listingData = await getListingById(params.listing_id);
  const user = await getCurrentUser();
  const reservations = await getReservations(params);
  const reviews = await getFeedbacks({
    listingId: listingData?.id,
  });

  if (isNull(user)) {
    return (
      <EmptyState
        showReset
        subTitle="please login to your account!"
        title="unable to show details"
      />
    );
  }
  if (isNull(listingData)) {
    return (
      <EmptyState
        showReset
        subTitle="maybe there is no listing here to show!"
        title="unable to show details"
      />
    );
  }
  return (
    <ListingClient
      listing={listingData}
      user={user}
      reservations={reservations}
      reviews={reviews}
    />
  );
}
