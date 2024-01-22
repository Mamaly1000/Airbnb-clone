"use client";
import { safeReservationType } from "@/types/safeReservation";
import { safeUserType } from "@/types/safeuser";
import React, { useCallback, useState } from "react";
import Container from "../ui/Container";
import Heading from "../form/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../card/ListingCard";
import { useUpdateReservationModal } from "@/hooks/useUpdateReservationModal";
import useLoginModal from "@/hooks/useLoginModal";

const TripesClient = ({
  trips,
  user,
}: {
  trips: safeReservationType[];
  user?: safeUserType | null;
}) => {
  const LoginModal = useLoginModal();

  const updateReservationModal = useUpdateReservationModal();
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
    [setDeletingId, router]
  );
  return (
    <Container>
      <Heading
        title="trips"
        subtitle="Where you`ve been and where you`re going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {trips.map((trip) => {
          return (
            <ListingCard
              listing={trip.listing}
              key={trip.id}
              reservation={trip}
              disabled={deletingId === trip.id}
              user={user}
              action={{
                actionId: trip.id,
                onAction: onCancel,
                actionLabel: "Cancel reservation",
              }}
              updateAction={{
                label: "update your reservation",
                onClick: () => {
                  if (user) {
                    updateReservationModal.onOpen({
                      id: trip.id,
                      reservations: trips,
                    });
                  } else {
                    LoginModal.onOpen();
                  }
                },
              }}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default TripesClient;
