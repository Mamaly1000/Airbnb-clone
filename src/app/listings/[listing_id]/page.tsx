import getCurrentUser from "@/actions/getCurrentUser";
import { getListingById } from "@/actions/getListingById";
import { getReservations } from "@/actions/getReservations";
import ListingClient from "@/components/listings/ListingClient";
import EmptyState from "@/components/ui/EmptyState";
import React from "react";

const SingleListingPage = async ({
  params,
}: {
  params: { listing_id: string };
}) => {
  const listing = await getListingById(params.listing_id);
  const user = await getCurrentUser();
  const reservations = await getReservations(params);
  if (!listing) {
    return (
      <EmptyState
        showReset
        subTitle="it can be your internet connection problem!"
        title="unable to show details"
      />
    );
  }
  return <ListingClient listing={listing} user={user} reservations={reservations} />;
};

export default SingleListingPage;
