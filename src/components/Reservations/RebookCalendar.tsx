import useLoginModal from "@/hooks/useLoginModal";
import { safeListingType } from "@/types/safeListing";
import { safeReservationType } from "@/types/safeReservation";
import { safeUserType } from "@/types/safeuser";
import { Listing, Reservation, User } from "@prisma/client";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";
import { initialDateRange } from "../listings/ListingClient";
import { useRouter } from "next/navigation";
import axios from "axios";
import { categories } from "../categories/Categories";
import ListingReservation from "../listings/ListingReservation";
import EmptyState from "../ui/EmptyState";

const RebookCalendar = ({
  reservations,
  listing,
  user,
  isLoading,
  setLoading,
  dateRange,
  totalPrice,
  setDateRange,
  setTotalPrice,
}: {
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  dateRange: Range;
  totalPrice: number;
  setDateRange: React.Dispatch<React.SetStateAction<Range>>;
  isLoading?: boolean;
  setLoading: (val: boolean) => void;
  reservations: Reservation[] | safeReservationType[];
  user: User | safeUserType;
  listing: Listing | safeListingType;
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disableDate = useMemo(() => {
    let dates: Date[] = [];
    if (reservations) {
      reservations.forEach((reservation) => {
        const range = eachDayOfInterval({
          start: new Date(reservation.startDate),
          end: new Date(reservation.endDate),
        });
        dates = [...dates, ...range];
      });
    }
    return dates;
  }, [reservations]);
  const createReservation = useCallback(() => {
    if (!user) {
      return loginModal.onOpen();
    }
    setLoading(true);
    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing!.id,
      })
      .then((res: { data: any }) => {
        toast.success(res.data.message);
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch((error) => {
        toast.error("something went wrong!");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, loginModal, dateRange, router, listing!.id, totalPrice]);
  const category = useMemo(() => {
    if (listing!.category)
      return categories.find((c) => c.label === listing!.category);
  }, [listing!.category]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.startDate,
        dateRange.endDate
      );
      if (dayCount && listing!.price) {
        const total = dayCount * listing!.price;
        setTotalPrice(total > 0 ? total : -total);
      } else {
        setTotalPrice(listing!.price);
      }
    }
  }, [dateRange, listing!.price]);
  if (!reservations && !listing && !user) {
    return (
      <EmptyState
        subTitle="something went wrong."
        title="please refresh your page!"
      />
    );
  }
  return (
    <div className="min-w-full">
      <ListingReservation
        rebook={true}
        listing={listing as any}
        reservations={reservations as any}
        user={user as any}
      />
    </div>
  );
};

export default RebookCalendar;
