import { getCompletedReservations } from "@/actions/getCompletedReservations";
import getCurrentUser from "@/actions/getCurrentUser";
import CompletedReservationsList from "@/components/Reservations/CompletedReservationsList";
import EmptyState from "@/components/ui/EmptyState";
import React from "react";

const CompletedReservations = async () => {
  const user = await getCurrentUser();
  if (!user || !user.id) {
    return (
      <EmptyState
        title="Unauthorized!"
        subTitle="Please login to your account."
      />
    );
  }
  const reservations = await getCompletedReservations({
    userId: user.id,
  } as any);
  if (!reservations) {
    return (
      <EmptyState
        title="There is no completed reservation here!"
        subTitle="lets make a reservation"
      />
    );
  }
  return <CompletedReservationsList reservations={reservations} user={user} />;
};

export default CompletedReservations;
