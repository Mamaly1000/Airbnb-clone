import getCurrentUser from "@/actions/getCurrentUser";
import { getReservations } from "@/actions/getReservations";
import TripesClient from "@/components/trips/TripesClient";
import EmptyState from "@/components/ui/EmptyState";
import { isNull } from "lodash"; 
import React from "react";

export const revalidate = 0;

const Trips = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser || isNull(currentUser)) {
    return <EmptyState title="Unauthorized" subTitle="Please login!" />;
  }
  const reservationsData = await getReservations({
    userId: currentUser.id,
  });

  return (
    <TripesClient
      params={{
        userId: currentUser.id,
      }}
      reservationsData={reservationsData}
      user={currentUser}
    />
  );
};

export default Trips;
