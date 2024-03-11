import { safeListingType } from "@/types/safeListing";
import { safeReservationType } from "@/types/safeReservation";
import { safeUserType } from "@/types/safeuser";
import { Listing, Reservation, User } from "@prisma/client";
import React from "react";

import ListingReservation from "../listings/ListingReservation";
import EmptyState from "../ui/EmptyState";
import { RangeKeyDict } from "react-date-range";

const RebookCalendar = ({
  reservations,
  listing,
  user,
  setTotalPrice,
  setCustomDaterange,
}: {
  setCustomDaterange: (value: RangeKeyDict) => void;
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
        setCustomDaterange={setCustomDaterange}
        setTotalPrice={setTotalPrice}
        rebook
        listing={listing as any}
        reservations={reservations as any}
        user={user as any}
      />
    </div>
  );
};

export default RebookCalendar;
