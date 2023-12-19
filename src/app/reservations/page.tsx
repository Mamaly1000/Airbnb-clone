import getCurrentUser from "@/actions/getCurrentUser";
import { getReservations } from "@/actions/getReservations";
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
  if (reservatoins.length === 0) {
    return (
      <EmptyState
        subTitle="Looks like you have no reservations on your properties."
        title="No reservations found!"
      />
    );
  }
  return <ReservationsClient user={user} reservations={reservatoins} />;
};

export default Reservations;
