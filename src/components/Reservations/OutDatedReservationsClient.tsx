"use client";
import React, { useCallback, useState } from "react";
import { safeUserType } from "@/types/safeuser";
import { useRebookModal } from "@/hooks/useRebookModal";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ReservationList from "../lists/ReservationList";
import { safeListingType } from "@/types/safeListing";
import { safeReservationType } from "@/types/safeReservation";

const OutDatedReservationsClient = ({
  reservations,
  pagination,
}: {
  pagination: {
    hasMore: boolean;
    total: number;
    maxPages: number;
  };
  user: safeUserType;
  reservations: Array<safeReservationType>;
}) => {
  const router = useRouter();

  const rebookModal = useRebookModal();
  const LoginModal = useLoginModal();

  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (_listing: safeListingType, reservation?: safeReservationType) => {
      if (reservation) {
        setDeletingId(reservation.id);
        axios
          .delete(`/api/reservations/${reservation.id}`)
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
      } else {
        LoginModal.onOpen();
      }
    },
    [router]
  );

  return (
    <ReservationList
      main
      className="pt-32"
      deletingId={deletingId}
      Cancel={{
        label: "Cancel Reservation",
        onClick: onCancel,
      }}
      Edit={{
        label: "Rebook Reservation",
        onClick: (_l, r) => {
          if (r) {
            rebookModal.onOpen({
              listingId: r.listingId,
              reservationId: r.id,
            });
          }
        },
      }}
      Outdated
      pagination={pagination}
      reservations={reservations}
      header={{
        title: "outdated reservations",
        subTitle:
          "here you can observe outdated reservations and rebook your outdated reservations",
      }}
      empty={{
        subTitle:
          "Looks like you have no outdated reservations on your properties or trips.",
        title: "No outdated reservations found!",
      }}
    />
  );
};

export default OutDatedReservationsClient;
