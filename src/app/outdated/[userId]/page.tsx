import getOutdatedReservations from "@/actions/getOutdatedReservations"; 
import EmptyState from "@/components/ui/EmptyState"; 
import React from "react"; 
import getCurrentUser from "@/actions/getCurrentUser";
import { Reservation } from "@prisma/client";
import OutDatedReservationsClient from "@/components/Reservations/OutDatedReservationsClient";

const Outdated = async ({ params }: { params: { userId: string } }) => {
  const id = params.userId as string;
  const { reservations } = await getOutdatedReservations(id);
  const user = await getCurrentUser();

  if (!!!reservations || !!!user) {
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
