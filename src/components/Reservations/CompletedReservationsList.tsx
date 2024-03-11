"use client";
import React from "react";
import EmptyState from "../ui/EmptyState";
import Heading from "../form/Heading";
import ListingCard from "../card/ListingCard";
import { Listing, Reservation, User } from "@prisma/client";
import Container from "../ui/Container";
import { safeUserType } from "@/types/safeuser";

const CompletedReservationsList = ({
  reservations,
  user,
}: {
  user: User | safeUserType;
  reservations: Array<Reservation & { listing: Listing }>;
}) => {
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="There is no completed reservation here!"
        subTitle="lets make a reservation"
      />
    );
  }
  return (
    <Container main classname="min-w-full max-w-full ">
      <Heading
        title="Completed Reservations"
        subtitle="here you can observe your completed reservations"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              listing={reservation.listing as any}
              reservation={reservation as any}
              user={user as any}
              key={reservation.id}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default CompletedReservationsList;
