import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import RateInput from "../inputs/RateInput";
import { formatDistanceToNowStrict } from "date-fns";
import Avatar from "../ui/Avatar";
import { safeReviewType } from "@/types/safeReviewType";
import { useRouter } from "next/navigation";

const SmallReviewCard = ({
  index,
  review,
  className,
}: {
  className?: string;
  index: number;
  review: safeReviewType;
}) => {
  const router = useRouter();
  const createdAt = useMemo(() => {
    return formatDistanceToNowStrict(review.createdAt, { addSuffix: true });
  }, [review.createdAt]);

  return (
    <motion.article
      initial={{ opacity: 0, translateX: 20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.13, delay: index / 10 + 0.01, ease: "linear" }}
      className={twMerge(
        `min-w-[250px] min-h-[250px] max-w-[250px] max-h-[250px] rounded-lg bg-white drop-shadow-2xl
         dark:bg-neutral-900 text-black dark:text-white
          flex items-start justify-between flex-col gap-2 p-3
           hover:bg-neutral-300 dark:hover:bg-neutral-950 cursor-pointer 
          `,
        className
      )}
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/reviews/${review.listingId}`);
      }}
    >
      <div className="min-w-full max-w-full flex flex-col items-start justify-start gap-2">
        <div className="min-w-full max-w-full flex items-center justify-start gap-2">
          <RateInput
            id={review.id}
            val={review.rating}
            readOnly
            disabled
            size="15px"
            space={"2px"}
            className="text-rose-500 max-w-[100px] min-w-[100px] w-[100px]"
          />
          <span className="text-[10px] font-semibold">{createdAt}</span>
        </div>
        <p className="text-[16px] text-neutral-500 dark:text-neutral-200 capitalize font-light min-w-full max-w-full whitespace-pre-wrap line-clamp-5 ">
          {review.body}
        </p>
      </div>
      <div className="min-w-full max-w-full flex items-center justify-start gap-2 ">
        <Avatar userId={review.userId} />
        <div className="flex flex-col items-start justify-start">
          <p className="text-[15px] font-semibold capitalize">
            {review?.user?.name}
          </p>{" "}
          <p className="font-semibold capitalize text-neutral-500 dark:text-neutral-400 text-[10px] whitespace-nowrap line-clamp-1">
            {review?.user?.email}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

export default SmallReviewCard;
