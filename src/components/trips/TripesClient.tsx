"use client";
import { safeReservationType } from "@/types/safeReservation";
import { safeUserType } from "@/types/safeuser";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useUpdateReservationModal } from "@/hooks/useUpdateReservationModal";
import useLoginModal from "@/hooks/useLoginModal";
import ReservationList from "../lists/ReservationList";
import { reservertionReturnDataType } from "@/actions/getReservations";
import { safeListingType } from "@/types/safeListing";
import ReservationPagination from "../pagination/ReservationPagination";
import { reservationQueryType } from "../../actions/getReservations";

const TripesClient = ({
  reservationsData,
  user,
  params,
}: {
  params?: reservationQueryType;
  reservationsData: reservertionReturnDataType;
  user?: safeUserType;
}) => {
  const LoginModal = useLoginModal();
  const updateReservationModal = useUpdateReservationModal();
  const router = useRouter();
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
      }
    },
    [setDeletingId, router]
  );
  const onUpdate = useCallback(
    (_listing: safeListingType, reservation?: safeReservationType) => {
      if (user) {
        if (reservation) {
          updateReservationModal.onOpen({
            id: reservation?.id,
            reservations: reservationsData.reservations,
          });
        } else {
          toast.error("something went wrong!");
        }
      } else {
        LoginModal.onOpen();
      }
    },
    []
  );
  return (
    <>
      <ReservationList
        pagination={reservationsData.pagination}
        reservations={reservationsData.reservations}
        deletingId={deletingId}
        className="pt-32"
        user={user}
        feedback
        Cancel={{
          onClick: onCancel,
          label: "Cancel reservation",
        }}
        Edit={{
          label: "update your reservation",
          onClick: onUpdate,
        }}
        empty={{
          title: "No trips found",
          subTitle: "Looks like you haven`t reserved any trips!",
        }}
        header={{
          title: "trips",
          subTitle: "Where you`ve been and where you`re going",
        }}
      />
      <ReservationPagination
        user={user}
        params={params}
        pagination={reservationsData.pagination}
        Cancel={{
          onClick: onCancel,
          label: "Cancel reservation",
        }}
        feedback
        Edit={{
          label: "update your reservation",
          onClick: onUpdate,
        }}
      />
    </>
  );
};

export default TripesClient;
