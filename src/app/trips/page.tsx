import getCurrentUser from "@/actions/getCurrentUser";
import { getReservations } from "@/actions/getReservations";
import TripesClient from "@/components/trips/TripesClient";
import EmptyState from "@/components/ui/EmptyState";
import React from "react";

const Trips = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login!" />;
  }
  const reservations = await getReservations({
    userId: currentUser.id,
  });
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subTitle="Looks like you haven`t reserved any trips!"
        refresh
      />
    );
  }
  return <TripesClient trips={reservations} user={currentUser} />;
};

export default Trips;
