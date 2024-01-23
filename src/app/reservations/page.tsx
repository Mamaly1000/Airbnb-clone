import getCurrentUser from "@/actions/getCurrentUser";
import getOutdatedReservations from "@/actions/getOutdatedReservations";
import { getReservations } from "@/actions/getReservations";
import OutDatedReservationsClient from "@/components/Reservations/OutDatedReservationsClient";
import ReservationsClient from "@/components/Reservations/ReservationsClient";
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
    <section className="flex items-center justify-center min-w-full flex-col gap-8">
      <ReservationsClient user={user} reservations={reservatoins || []} />
      <OutDatedReservationsClient
        user={user}
        reservations={outdatedReservations || []}
      />
    </section>
  );
};

export default Reservations;
