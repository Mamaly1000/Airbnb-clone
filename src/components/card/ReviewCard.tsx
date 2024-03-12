"use client";

import { safeReviewType } from "@/types/safeReviewType";
import { safeUserType } from "@/types/safeuser";
import React, { useMemo } from "react";
import Avatar from "../ui/Avatar";
import { twMerge } from "tailwind-merge";
import RateInput from "../inputs/RateInput";
import { formatDistanceToNowStrict } from "date-fns";
import { motion } from "framer-motion";

const ReviewCard = ({
  review,
  user,
  className,
  index,
}: {
  index: number;
  className?: string;
  review: safeReviewType;
  user?: safeUserType | null;
}) => {
  const createdAt = useMemo(() => {
    if (!review.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(review.createdAt, {
      addSuffix: true,
    });
  }, [review.createdAt]);
  return (
    <motion.article
      initial={{ opacity: 0, translateX: 5 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ ease: "linear", duration: 0.14, delay: index / 10 + 0.01 }}
      className={twMerge(
        `
    min-w-full flex items-start justify-start gap-2 flex-col
     border-[1px] border-neutral-200 dark:border-neutral-700
      rounded-lg p-3 `,
        className
      )}
    >
      <div className="min-w-full max-w-full flex items-center justify-start gap-2">
        <Avatar userId="" className="w-[40px] h-[40px] " />
        <div className="flex items-start justify-start flex-col">
          <p className="text-black dark:text-white text-[16px]">
            {review.user.name}
          </p>
          <p className="text-[12px] text-neutral-400 ">
            {review.user.email}
          </p>
        </div>
      </div>
      <div className="min-w-full max-w-full flex flex-col items-start justify-start gap-1">
        <div className="flex items-center justify-start gap-1">
          <RateInput
            readOnly
            size="13px"
            className="max-w-[35px] pb-[.5px]"
            val={review.rating}
            id={review.id}
          />
          <span className="whitespace-nowrap text-sm text-neutral-400">
            {createdAt}
          </span>
        </div>
        <p className="font-light min-w-full max-w-full ">{review.body}</p>
      </div>
    </motion.article>
  );
};

export default ReviewCard;
