"use client";
import { useRebookModal } from "@/hooks/useRebookModal";
import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import useLoginModal from "@/hooks/useLoginModal";
import RebookCalendar from "../Reservations/RebookCalendar";
import toast from "react-hot-toast";
import axios from "axios";
import { initialDateRange } from "../listings/ListingClient";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import useProperty from "@/hooks/useProperty";
import useUser from "@/hooks/useUser";
import useReservations from "@/hooks/useReservations";
import Loader from "../ui/Loader";

const RebookReservationModal = () => {
  const { isOpen, onClose, reservationId, listingId } = useRebookModal();
  const loginModal = useLoginModal();

  const { property, mutate: propertyMutate } = useProperty(listingId);
  const { reservations, mutate: reservationsMutate } = useReservations({
    listingId,
    paginate: false,
  });
  const { user, mutate: userMutate } = useUser();

  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(property?.price || 0);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [isLoading, setLoading] = useState(false);

  const rebookReservation = useCallback(
    async (_e: any) => {
      if (!user) {
        return loginModal.onOpen();
      }
      setLoading(true);
      await axios
        .post(`/api/rebook/${reservationId}`, {
          totalPrice,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          listingId: property?.id,
        })
        .then((res: { data: any }) => {
          toast.success(res.data.message);
          setDateRange(initialDateRange);
          propertyMutate();
          reservationsMutate();
          userMutate();
          setTotalPrice(0);
          onClose();
          router.refresh();
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
    },
    [
      user,
      loginModal,
      dateRange,
      router,
      property,
      totalPrice,
      onClose,
      propertyMutate,
      reservationId,
      reservationsMutate,
      userMutate,
    ]
  );

  return (
    <Modal
      isOpen={isOpen}
      onChange={(val) => {
        if (!val) {
          onClose();
        }
      }}
      body={
        <div className="min-w-full flex flex-col items-start justify-start gap-8  ">
          {property && reservations && user ? (
            <RebookCalendar
              dateRange={dateRange}
              setDateRange={setDateRange}
              setTotalPrice={setTotalPrice}
              totalPrice={totalPrice}
              listing={property}
              reservations={reservations}
              user={user}
            />
          ) : (
            <Loader className="min-w-full h-[300px] max-h-[300px] flex items-center justify-center" />
          )}
        </div>
      }
      disable={isLoading}
      header={{
        title: "Rebook your reservation",
        close: () => {
          setDateRange(initialDateRange);
          router.refresh();
          onClose();
        },
      }}
      footer={{
        primary: {
          label: "rebook now",
          onClick: (e: any) => rebookReservation(e),
        },
      }}
    />
  );
};

export default RebookReservationModal;
