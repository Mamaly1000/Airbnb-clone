"use client";
import { safeReservationType } from "@/types/safeReservation";
import { safeUserType } from "@/types/safeuser";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react"; 
import axios from "axios";
import toast from "react-hot-toast"; 
import ReservationList from "../lists/ReservationList";
import { safeListingType } from "@/types/safeListing"; 

const ReservationsClient = ({
  user,
  reservations,
  pagination,
}: {
  pagination: {
    hasMore: boolean;
    total: number;
    maxPages: number;
  };
  user?: safeUserType | null;
  reservations: safeReservationType[];
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (_listing: safeListingType, reservation?: safeReservationType) => {
      if (reservation) {
        setDeletingId(reservation?.id);
        axios
          .delete(`/api/reservations/${reservation?.id}`)
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
      }
    },
    [router]
  );

  return (
    <ReservationList
      Cancel={{
        label: "Cancel Reservation",
        onClick: onCancel,
      }}
      deletingId={deletingId}
      pagination={pagination}
      reservations={reservations}
      user={user}
      header={{
        title: "Reservations",
        subTitle: "Booking on your properties",
      }}
      main
      className="pt-32"
    />
  );
};

export default ReservationsClient;
