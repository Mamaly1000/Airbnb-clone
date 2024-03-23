"use client";
import React from "react";
import { RowData } from "../table-body/TableBody";
import { AnimatePresence, motion } from "framer-motion";
import { safeUserType } from "../../../types/safeuser";
import { safeListingType } from "@/types/safeListing";
import TD from "../table-shared-components/TD";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { safeReviewType } from "@/types/safeReviewType";
import { useReviewTable } from "@/hooks/useReviewsTable";
import { ReviewsStatusTypes } from "@/types/ReviewTypes";
import Avatar from "@/components/ui/Avatar";
import { MdOutlineStarPurple500 } from "react-icons/md";

const ReviewRow = ({
  row,
  index,
}: {
  index: number;
  row: Omit<RowData, "data"> & {
    data: safeReviewType & {
      user: safeUserType;
      listing: safeListingType;
    };
  };
}) => {
  const { hiddenCols, searchParams, hiddenRows } = useReviewTable();
  return (
    <AnimatePresence>
      {!hiddenRows.includes(row?.row_type as ReviewsStatusTypes) && (
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
            isSorting={!!searchParams.userId}
            className="capitalize flex items-center justify-center gap-2 font-semibold py-0 sticky top-0 -left-3 bg-white dark:bg-neutral-800 z-10"
            index={index}
            display={!!hiddenCols.includes("USER_NAME")}
          >
            <Avatar
              userId={row.data.userId}
              className="w-[30px] h-[30px] max-w-[30px] max-h-[30px] min-h-[30px] min-w-[30px]"
            />
            {row.data.user.name}
          </TD>
          <TD
            isSorting={searchParams.sort === "CREATED_AT"}
            index={index}
            className="min-w-[220px] max-w-[220px]"
            display={!!hiddenCols.includes("CREATED_AT")}
          >
            {format(new Date(row.data.createdAt), "yyyy/MMMM/dd-hh:mm a")}
          </TD>
          <TD
            className="overflow-hidden py-0 min-w-[300px] max-w-[300px]"
            isSorting={!!searchParams.search}
            index={index}
            display={!!hiddenCols.includes("BODY")}
          >
            {row.data.body}
          </TD>
          <TD
            isSorting={!!searchParams.listingId}
            index={index}
            className="overflow-hidden py-0 min-w-[300px] max-w-[300px]"
            display={!!hiddenCols.includes("LISTING_NAME")}
          >
            {row.data.listing.title.slice(0, 50)}
          </TD>
          <TD
            isSorting={searchParams.sort === "CLEANLINESS"}
            index={index}
            className="flex items-center justify-center gap-1"
            display={!!hiddenCols.includes("CLEANLINESS")}
          >
            <MdOutlineStarPurple500 size={15} /> {row.data.cleanliness}
          </TD>
          <TD
            isSorting={searchParams.sort === "ACCURACY"}
            index={index}
            className="flex items-center justify-center gap-1"
            display={!!hiddenCols.includes("ACCURACY")}
          >
            <MdOutlineStarPurple500 size={15} /> {row.data.accuracy}
          </TD>
          <TD
            isSorting={searchParams.sort === "CHECK_IN"}
            index={index}
            className="flex items-center justify-center gap-1"
            display={!!hiddenCols.includes("CHECK_IN")}
          >
            <MdOutlineStarPurple500 size={15} /> {row.data.checkIn}
          </TD>
          <TD
            isSorting={searchParams.sort === "COMMUNICATION"}
            index={index}
            className="flex items-center justify-center gap-1"
            display={!!hiddenCols.includes("COMMUNICATION")}
          >
            <MdOutlineStarPurple500 size={15} /> {row.data.communication}
          </TD>
          <TD
            isSorting={searchParams.sort === "LOCATION"}
            index={index}
            className="flex items-center justify-center gap-1"
            display={!!hiddenCols.includes("LOCATION")}
          >
            <MdOutlineStarPurple500 size={15} /> {row.data.location}
          </TD>
          <TD
            isSorting={searchParams.sort === "VALUE"}
            index={index}
            className="flex items-center justify-center gap-1"
            display={!!hiddenCols.includes("VALUE")}
          >
            <MdOutlineStarPurple500 size={15} /> {row.data.value}
          </TD>
          <TD
            className="lg:sticky top-0 -right-3 bg-white dark:bg-neutral-800 flex items-center justify-center "
            index={index}
            display={!!hiddenCols.includes("RATING")}
          >
            <span
              className={twMerge(
                "px-3 py-2 rounded-lg drop-shadow-2xl flex items-center justify-center gap-1",
                row.data.rating >= 4 &&
                  "bg-[#18C964] bg-opacity-20 text-[#12A150] dark:text-[#71e8a5] ",
                (row.data.rating >= 3 || row.data.rating < 4) &&
                  "bg-[#bac918] bg-opacity-20 text-[#a1a112] dark:text-[#e0e871]",
                row.data.rating < 3 &&
                  "bg-[#c91818] bg-opacity-20 text-[#a11212] dark:text-[#e87171]"
              )}
            >
              <MdOutlineStarPurple500 size={15} />
              {row.data.rating.toFixed(2)}
            </span>
          </TD>
        </motion.tr>
      )}
    </AnimatePresence>
  );
};

export default ReviewRow;
