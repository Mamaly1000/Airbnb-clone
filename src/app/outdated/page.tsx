import getOutdatedReservations from "@/actions/getOutdatedReservations";
import EmptyState from "@/components/ui/EmptyState";
import React from "react";
import getCurrentUser from "@/actions/getCurrentUser";
import { Reservation } from "@prisma/client";
import OutDatedReservationsClient from "@/components/Reservations/OutDatedReservationsClient";

export const revalidate = 0;

const Outdated = async () => {
  const { reservations } = await getOutdatedReservations();
  const user = await getCurrentUser();

  if (!!!reservations || reservations.length === 0 || !!!user) {
    return <EmptyState showReset subTitle="loading outdated reservations" />;
  }

  return (
    <OutDatedReservationsClient
      user={user}
      reservations={reservations as Reservation[] as any}
    />
  );
};

export default Outdated;
