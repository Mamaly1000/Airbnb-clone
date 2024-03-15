import { getCompletedReservations } from "@/actions/getCompletedReservations";
import getCurrentUser from "@/actions/getCurrentUser";
import { getReservations } from "@/actions/getReservations";
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
  const { reservations, pagination } = await getReservations({
    userId: user.id,
    status: "COMPLETED",
  });

  return (
    <CompletedReservationsList
      params={{
        userId: user.id,
        status: "COMPLETED",
      }}
      pagination={pagination}
      reservations={reservations}
      user={user}
    />
  );
};

export default CompletedReservations;
