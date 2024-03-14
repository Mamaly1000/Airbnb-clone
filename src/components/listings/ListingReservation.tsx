"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Range, RangeKeyDict } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../inputs/Button";
import useLoginModal from "@/hooks/useLoginModal";
import { initialDateRange } from "./ListingClient";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { safeListingType } from "@/types/safeListing";
import { safeReservationType } from "@/types/safeReservation";
import { safeUserType } from "@/types/safeuser";
import axios from "axios";
import toast from "react-hot-toast";

const ListingReservation = ({
  rebook = false,
  listing,
  reservations,
  user,
  setTotalPrice: onPriceChange,
  setCustomDaterange,
}: {
  setCustomDaterange?: (value: RangeKeyDict) => void;
  setTotalPrice?: (val: number) => void;
  user?: safeUserType | null;
  reservations: safeReservationType[];
  listing: safeListingType;
  rebook?: boolean;
}) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing?.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const loginModal = useLoginModal();

  const disableDate = useMemo(() => {
    let dates: Date[] = [];
    reservations?.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
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
        listingId: listing.id,
      })
      .then((res: { data: any }) => {
        toast.success(res.data.message);
        setDateRange(initialDateRange);
        router.push("/trips");
        router.refresh();
      })
      .catch((error) => {
        toast.error("something went wrong!");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, loginModal, dateRange, router, listing.id, totalPrice]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.startDate,
        dateRange.endDate
      );
      if (dayCount && listing.price) {
        const total = dayCount * listing.price;
        setTotalPrice(total > 0 ? total : -total);
        if (onPriceChange) {
          onPriceChange!(total > 0 ? total : -total);
        }
      } else {
        setTotalPrice(listing.price);
        if (onPriceChange) {
          onPriceChange!(listing.price);
        }
      }
    }
  }, [dateRange, listing.price]);

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border-[1px] border-neutral-200 dark:border-neutral-500 drop-shadow-2xl max-w-full overflow-hidden">
      <div className="flex flex-row gap-1 items-center p-4">
        <div className="text-2xl font-semibold">$ {listing.price}</div>
        <div className="font-light text-neutral-600 dark:text-neutral-300">
          night
        </div>
      </div>
      <hr className="border-black dark:border-neutral-400" />
      <Calendar
        value={dateRange}
        disabledDates={disableDate}
        onChnage={(value) => {
          if (setCustomDaterange) {
            setCustomDaterange(value);
          }
          setDateRange(value.selection);
        }}
      />
      <hr className="border-black dark:border-neutral-400" />
      {!rebook && (
        <div className="p-4 ">
          <Button
            disabled={isLoading}
            label="Reserve"
            onClick={createReservation}
          />
        </div>
      )}
      <div className=" capitalize p-4 flex flex-row items-center justify-between font-semibold text-lg ">
        <div>total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
