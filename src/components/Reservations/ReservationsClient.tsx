"use client";
import { safeReservationType } from "@/types/safeReservation";
import { safeUserType } from "@/types/safeuser";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import Container from "../ui/Container";
import Heading from "../form/Heading";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../card/ListingCard";
import EmptyState from "../ui/EmptyState";

const ReservationsClient = ({
  user,
  reservations,
}: {
  user?: safeUserType | null;
  reservations: safeReservationType[];
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then((res) => {
          toast.success(res.data.message);
          router.refresh();
        })
        .catch((err) => {
          console.log(err);
          toast.error("something went wrong!");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  if (reservations.length === 0) {
    return (
      <EmptyState
        subTitle="Looks like you have no reservations on your properties."
        title="No reservations found!"
      />
    );
  }
  return (
    <Container>
      <Heading title="Reservations" subtitle="Booking on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              listing={reservation.listing}
              action={{
                actionId: reservation.id,
                actionLabel: "Cancel Reservation",
                onAction: onCancel,
              }}
              disabled={deletingId === reservation.id}
              reservation={reservation}
              user={user}
              key={reservation.id}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default ReservationsClient;
