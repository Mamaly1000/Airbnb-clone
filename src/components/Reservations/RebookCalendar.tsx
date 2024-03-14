import { safeListingType } from "@/types/safeListing";
import { safeReservationType } from "@/types/safeReservation";
import { safeUserType } from "@/types/safeuser";
import { Listing, Reservation, User } from "@prisma/client";
import React, { useEffect, useMemo } from "react";
import EmptyState from "../ui/EmptyState";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import { initialDateRange } from "../listings/ListingClient";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";

const RebookCalendar = ({
  reservations,
  listing,
  user,
  setTotalPrice,
  setDateRange,
  totalPrice,
  dateRange = initialDateRange,
}: {
  setTotalPrice: (val: number) => void;
  setDateRange: (val: Range) => void;
  totalPrice: number;
  dateRange: Range;
  reservations: Reservation[] | safeReservationType[];
  user: User | safeUserType;
  listing: Listing | safeListingType;
}) => {
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

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.startDate,
        dateRange.endDate
      );
      if (dayCount && listing.price) {
        const total = dayCount * listing.price;
        setTotalPrice(total > 0 ? total : -total);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);
  if (!reservations && !listing && !user) {
    return (
      <EmptyState
        subTitle="something went wrong."
        title="please refresh your page!"
      />
    );
  }
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border-[1px] border-neutral-200 dark:border-neutral-500 drop-shadow-2xl overflow-hidden min-w-full max-w-full">
      <div className="flex flex-row gap-1 items-center p-4">
        <div className="text-2xl font-semibold text-black dark:text-white">
          $ {listing.price}
        </div>
        <div className="font-light text-neutral-600 dark:text-neutral-300">
          night
        </div>
      </div>
      <hr className="border-black dark:border-neutral-400" />
      <Calendar
        value={dateRange}
        disabledDates={disableDate}
        onChnage={(value) => {
          setDateRange(value.selection);
        }}
      />
      <hr className="border-black dark:border-neutral-400" />
      <div className=" capitalize p-4 flex flex-row items-center justify-between font-semibold text-lg dark:text-white text-black">
        <div>total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default RebookCalendar;
