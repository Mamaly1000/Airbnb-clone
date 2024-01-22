"use client";
import { useRebookModal } from "@/hooks/useRebookModal";
import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import useLoginModal from "@/hooks/useLoginModal";
import Button from "../inputs/Button";
import RebookCalendar from "../Reservations/RebookCalendar";
import toast from "react-hot-toast";
import axios from "axios";
import { initialDateRange } from "../listings/ListingClient";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";

const RebookReservationModal = () => {
  const { listing, user, reservations, isOpen, onClose, reservationId } =
    useRebookModal();
  const loginModal = useLoginModal();

  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing?.price || 0);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const createReservation = useCallback(
    async (e: any) => {
      e.preventDefault();
      if (!user) {
        return loginModal.onOpen();
      }
      setLoading(true);
      await axios
        .post(`/api/rebook/${reservationId}`, {
          totalPrice,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          listingId: listing!.id,
        })
        .then((res: { data: any }) => {
          toast.success(res.data.message);
          setDateRange(initialDateRange);
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
    [user, loginModal, dateRange, router, listing, totalPrice]
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
        <form
          onSubmit={createReservation}
          className="min-w-full flex flex-col items-start justify-start gap-8"
        >
          {listing && reservations && user && (
            <RebookCalendar
              setTotalPrice={setTotalPrice}
              listing={listing}
              reservations={reservations}
              setLoading={(val) => setLoading(val)}
              user={user}
              isLoading={isLoading}
              dateRange={dateRange}
              setDateRange={setDateRange}
              totalPrice={totalPrice}
            />
          )}
          <Button disabled={isLoading} label="rebook now" type="submit" />
        </form>
      }
      disable={isLoading}
      header={{
        title: "Rebook your reservation",
        close: () => {},
      }}
    />
  );
};

export default RebookReservationModal;
