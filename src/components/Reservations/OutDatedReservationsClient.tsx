"use client";
import React from "react";
import Container from "../ui/Container";
import Heading from "../form/Heading";
import { Reservation } from "@prisma/client";
import ListingCard from "../card/ListingCard";
import { safeUserType } from "@/types/safeuser";
import { useRebookModal } from "@/hooks/useRebookModal";
import useLoginModal from "@/hooks/useLoginModal";

const OutDatedReservationsClient = ({
  reservations,
  user,
}: {
  user: safeUserType;
  reservations: Array<Reservation | any>;
}) => {
  const rebookModal = useRebookModal();
  const LoginModal = useLoginModal();

  return (
    <Container>
      <Heading
        title="outdated reservations"
        subtitle="here you can observe outdated reservations and rebook your outdated reservations"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              listing={reservation.listing}
              action={{
                actionId: reservation.id,
                actionLabel: "Rebook Reservation",
                onAction: () => {
                  if (user) {
                    rebookModal.onOpen({
                      listing: reservation.listing,
                      reservations: reservations,
                      user: user,
                      reservationId: reservation.id,
                    });
                  } else {
                    LoginModal.onOpen();
                  }
                },
              }}
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
