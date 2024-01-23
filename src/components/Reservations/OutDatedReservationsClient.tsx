"use client";
import React, { useCallback, useState } from "react";
import Container from "../ui/Container";
import Heading from "../form/Heading";
import { Reservation } from "@prisma/client";
import ListingCard from "../card/ListingCard";
import { safeUserType } from "@/types/safeuser";
import { useRebookModal } from "@/hooks/useRebookModal";
import useLoginModal from "@/hooks/useLoginModal";
import EmptyState from "../ui/EmptyState";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const OutDatedReservationsClient = ({
  reservations,
  user,
}: {
  user: safeUserType;
  reservations: Array<Reservation | any>;
}) => {
  const router = useRouter();

  const rebookModal = useRebookModal();
  const LoginModal = useLoginModal();

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
        subTitle="Looks like you have no outdated reservations on your properties."
        title="No outdated reservations found!"
      />
    );
  }

  return (
    <Container classname="min-w-full" >
      <Heading
        title="outdated reservations"
        subtitle="here you can observe outdated reservations and rebook your outdated reservations"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              Outdated
              listing={reservation.listing}
              action={{
                actionId: reservation.id,
                actionLabel: "Cancel Reservation",
                onAction: () => {
                  if (user) {
                    onCancel(reservation.id);
                  } else {
                    LoginModal.onOpen();
                  }
                },
              }}
              updateAction={{
                label: "Rebook Reservation",
                onClick: () => {},
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

export default OutDatedReservationsClient;
