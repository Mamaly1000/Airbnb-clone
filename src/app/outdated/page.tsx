import getOutdatedReservations from "@/actions/getOutdatedReservations";
import EmptyState from "@/components/ui/EmptyState";
import React from "react";
import getCurrentUser from "@/actions/getCurrentUser";
import { Reservation } from "@prisma/client";
import OutDatedReservationsClient from "@/components/Reservations/OutDatedReservationsClient";
import { getReservations } from "@/actions/getReservations";

export const revalidate = 0;

const Outdated = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <EmptyState
        title="Unauthorized!"
        subTitle="Please login to your account."
      />
    );
  }
  const { reservations, pagination } = await getReservations({
    type: "OUTDATED",
    userId: user.id,
  });

  return (
    <OutDatedReservationsClient
      pagination={pagination}
      user={user}
      reservations={reservations}
    />
  );
};

export default Outdated;
