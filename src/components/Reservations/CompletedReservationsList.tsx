"use client";
import React from "react";
import EmptyState from "../ui/EmptyState";
import { User } from "@prisma/client";
import { safeUserType } from "@/types/safeuser";
import ReservationList from "../lists/ReservationList";
import ReservationPagination from "../pagination/ReservationPagination";
import { safeReservationType } from "@/types/safeReservation";
import { reservationQueryType } from "@/actions/getReservations";

const CompletedReservationsList = ({
  reservations,
  pagination,
  params,
}: {
  params?: reservationQueryType;
  pagination: {
    hasMore: boolean;
    total: number;
    maxPages: number;
  };
  user: User | safeUserType;
  reservations: Array<safeReservationType>;
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
    <>
      <ReservationList
        main
        className="pt-32"
        reservations={reservations}
        pagination={pagination}
        header={{
          title: "Completed Reservations",
          subTitle: "here you can observe your completed reservations",
        }}
        empty={{
          title: "There is no completed reservation here!",
          subTitle: "lets make a reservation",
        }}
      />
      <ReservationPagination  params={params} pagination={pagination} />
    </>
  );
};

export default CompletedReservationsList;
