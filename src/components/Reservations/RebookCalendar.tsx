import { safeListingType } from "@/types/safeListing";
import { safeReservationType } from "@/types/safeReservation";
import { safeUserType } from "@/types/safeuser";
import { Listing, Reservation, User } from "@prisma/client";
import React from "react";

import ListingReservation from "../listings/ListingReservation";
import EmptyState from "../ui/EmptyState";

const RebookCalendar = ({
  reservations,
  listing,
  user,
  setTotalPrice,
}: {
  setTotalPrice?: (val: number) => void;
  reservations: Reservation[] | safeReservationType[];
  user: User | safeUserType;
  listing: Listing | safeListingType;
}) => {
  if (!reservations && !listing && !user) {
    return (
      <EmptyState
        subTitle="something went wrong."
        title="please refresh your page!"
      />
    );
  }
  return (
    <div className="min-w-full max-w-full">
      <ListingReservation
        setTotalPrice={setTotalPrice}
        rebook={true}
        listing={listing as any}
        reservations={reservations as any}
        user={user as any}
      />
    </div>
  );
};

export default RebookCalendar;
