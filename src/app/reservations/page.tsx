import getCurrentUser from "@/actions/getCurrentUser";
import getOutdatedReservations from "@/actions/getOutdatedReservations";
import { getReservations } from "@/actions/getReservations";
import OutDatedReservationsClient from "@/components/Reservations/OutDatedReservationsClient";
import ReservationsClient from "@/components/Reservations/ReservationsClient";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import React from "react";

const Reservations = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <EmptyState
        subTitle="Please Login to your account!"
        title="Unauthorized"
      />
    );
  }
  const reservatoins = await getReservations({
    authorId: user.id,
  });
  const { reservations: outdatedReservations } = await getOutdatedReservations({
    outherId: user.id,
  });

  return (
    <Container main classname="min-w-full max-w-full">
      <ReservationsClient user={user} reservations={reservatoins || []} />
      <OutDatedReservationsClient
        user={user}
        reservations={outdatedReservations || []}
      />
    </Container>
  );
};

export default Reservations;
