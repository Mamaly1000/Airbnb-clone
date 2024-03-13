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
  const { reservations, pagination } = await getReservations({
    authorId: user.id,
  });

  return (
    <ReservationsClient
      user={user}
      pagination={pagination}
      reservations={reservations}
    />
  );
};

export default Reservations;
