"use client";
import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import { useUpdateReservationModal } from "@/hooks/useUpdateReservationModal";
import { Range } from "react-date-range";
import { initialDateRange } from "../listings/ListingClient";
import { useRouter } from "next/navigation";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";
import useReservation from "@/hooks/useReservation";
import useUser from "@/hooks/useUser";
import toast from "react-hot-toast";
import RebookCalendar from "../Reservations/RebookCalendar";
import Heading from "../form/Heading";
import Loader from "../ui/Loader";
import useReservations from "@/hooks/useReservations";

const UpdateReservationModal = () => {
  const { id, onClose } = useUpdateReservationModal();
  const loginModal = useLoginModal();

  const { reservation, mutate } = useReservation(id);
  const { user } = useUser();
  const { reservations } = useReservations({
    listingId: reservation?.listingId,
    paginate: false,
  });

  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(
    reservation?.listing?.price || 0
  );
  const [dateRange, setDateRange] = useState<Range>(
    reservation
      ? ({
          endDate: reservation?.endDate,
          startDate: reservation?.startDate,
          key: reservation.id,
          disabled: true,
        } as any)
      : initialDateRange
  );

  const updateReservation = useCallback(async () => {
    if (!user) {
      return loginModal.onOpen();
    }
    if (reservation && reservation.listing) {
      setLoading(true);
      await axios
        .patch(`/api/reservations/${reservation.id}`, {
          totalPrice,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          listingId: reservation?.listing?.id,
        })
        .then((res: { data: any }) => {
          toast.success(res.data.message);
          setDateRange(initialDateRange);
          onClose();
          router.refresh();
          mutate();
        })
        .catch((error: any) => {
          if (error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("something went wrong!");
          }
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [
    user,
    loginModal,
    dateRange,
    router,
    reservation?.listing,
    totalPrice,
    mutate,
    onClose,
    reservation,
    setLoading,
  ]);
  return (
    <Modal
      isOpen={!!id}
      onChange={(val) => {
        if (!val) onClose();
      }}
      disable={isLoading}
      body={
        <div className="min-w-full max-w-full min-h-fit flex flex-col items-start justify-start gap-8 bg-white dark:bg-neutral-900">
          <Heading
            title="Update reservation date"
            subtitle="you can update your reservation date to your choosen date."
          />
          {reservation && reservation.listing && reservations && user ? (
            <RebookCalendar
              dateRange={dateRange}
              setDateRange={setDateRange}
              setTotalPrice={setTotalPrice}
              totalPrice={totalPrice}
              listing={reservation.listing}
              reservations={reservations}
              user={user}
            />
          ) : (
            <Loader className="min-w-full min-h-[200px] h-[200px] max-w-[200px] flex items-center justify-center bg-neutral-900" />
          )}
        </div>
      }
      header={{
        title: "Update reservation",
        close: () => {
          setDateRange(initialDateRange);
          setTotalPrice(0);
          onClose();
          router.refresh();
        },
      }}
      footer={{
        primary: {
          label: "update now",
          onClick: updateReservation,
        },
      }}
    />
  );
};

export default UpdateReservationModal;
