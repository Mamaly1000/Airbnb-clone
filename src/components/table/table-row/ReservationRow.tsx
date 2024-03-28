"use client";
import React from "react";
import { RowData } from "../table-body/TableBody";
import { safeReservationType } from "@/types/safeReservation";
import { AnimatePresence, motion } from "framer-motion";
import { safeUserType } from "../../../types/safeuser";
import { safeListingType } from "@/types/safeListing";
import TD from "../table-shared-components/TD";
import { useReservationTable } from "@/hooks/useReservationTable";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { reservationStatusTypes } from "@/hooks/useReservations";
import Avatar from "@/components/ui/Avatar";

const ReservationRow = ({
  row,
  index,
}: {
  index: number;
  row: Omit<RowData, "data"> & {
    data: safeReservationType & {
      user: safeUserType;
      listing: safeListingType;
    };
  };
}) => {
  const { hiddenColumns, SelectedSort, hiddenRows } = useReservationTable();
  return (
    <AnimatePresence>
      {!hiddenRows.includes(row.row_type as reservationStatusTypes) && (
        <motion.tr
          initial={{ opacity: 0, translateX: 10 }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{
            opacity: 0,
            transition: {
              delay: 0,
              duration: 0.1,
            },
          }}
          transition={{
            duration: 0.12,
            ease: "linear",
            delay: index / 10 + 0.01,
          }}
          className={twMerge(
            `px-3 py-3 
        min-w-fit w-full max-w-full 
        flex items-center justify-start gap-2 
        bg-inherit 
        border-neutral-300 dark:border-neutral-900
        border-b-[1px] border-x-[1px]   relative `
          )}
        >
          <TD
            isSorting={SelectedSort === "USER_NAME"}
            className="capitalize font-semibold py-0 md:sticky top-0 -left-3 bg-white dark:bg-neutral-800 z-10 flex items-center justify-start gap-2 whitespace-nowrap min-w-[230px] max-w[230px] "
            index={index}
            display={!!hiddenColumns.includes("USER_NAME")}
          >
            <Avatar
              userId={row.data.userId}
              className="w-[30px] h-[30px] max-w-[30px] max-h-[30px] min-h-[30px] min-w-[30px]"
            />
            {row.data.user.name}
          </TD>
          <TD
            isSorting={SelectedSort === "CREATED_AT"}
            index={index}
            className="min-w-[220px] max-w-[220px]"
            display={!!hiddenColumns.includes("CREATED_AT")}
          >
            {format(new Date(row.data.createdAt), "yyyy/MMMM/dd-hh:mm a")}
          </TD>
          <TD
            isSorting={SelectedSort === "TOTAL_AMOUNT"}
            index={index}
            display={!!hiddenColumns.includes("TOTAL_AMOUNT")}
          >
            ${row.data.totalPrice.toFixed(2)}
          </TD>
          <TD
            isSorting={SelectedSort === "LISTING_NAME"}
            index={index}
            className="overflow-hidden py-0 min-w-[300px] max-w-[300px]"
            display={!!hiddenColumns.includes("LISTING_NAME")}
          >
            {row.data.listing.title.slice(0, 50)}
          </TD>
          <TD
            isSorting={SelectedSort === "START-DATE"}
            className="min-w-[220px] max-w-[220px]"
            index={index}
            display={!!hiddenColumns.includes("START-DATE")}
          >
            {format(new Date(row.data.startDate), "yyyy/MMMM/dd-hh:mm a")}
          </TD>
          <TD
            isSorting={SelectedSort === "END_DATE"}
            className="min-w-[220px] max-w-[220px]"
            index={index}
            display={!!hiddenColumns.includes("END_DATE")}
          >
            {format(new Date(row.data.endDate), "yyyy/MMMM/dd-hh:mm a")}
          </TD>
          <TD
            className="lg:sticky top-0 -right-3 bg-white dark:bg-neutral-800 flex items-center justify-center "
            index={index}
            display={!!hiddenColumns.includes("STATUS")}
          >
            <span
              className={twMerge(
                "px-3 py-2 rounded-lg drop-shadow-2xl",
                row.data.status === "COMPLETED" &&
                  "bg-[#18C964] bg-opacity-20 text-[#12A150] dark:text-[#71e8a5] ",
                row.data.status === "PENDING" &&
                  "bg-[#bac918] bg-opacity-20 text-[#a1a112] dark:text-[#e0e871]",
                row.data.status === "OUTDATED" &&
                  "bg-[#c91818] bg-opacity-20 text-[#a11212] dark:text-[#e87171]"
              )}
            >
              {row.data.status}
            </span>
          </TD>
        </motion.tr>
      )}
    </AnimatePresence>
  );
};

export default ReservationRow;
