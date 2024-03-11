import { Feedback } from "@prisma/client";
import { initial, isEmpty, isNull } from "lodash";
import React from "react";
import EmptyState from "../ui/EmptyState";
import { motion } from "framer-motion";
import SmallReviewCard from "../card/SmallReviewCard";
import { safeReviewType } from "@/types/safeReviewType";
export type listingReviewQueryType = {
  listingId?: string;
  userId?: string;
  type?: "favorites" | "";
};
export default async function ListingReviews({
  params,
  initialData,
}: {
  initialData?: safeReviewType[];
  params?: listingReviewQueryType;
}) {
  if (isEmpty(initialData) || isNull(initialData)) {
    return <EmptyState small subTitle="this listing has no review" />;
  }
  return (
    <motion.section className="min-w-full max-w-full min-h-[350px] max-h-[350px] overflow-x-auto   flex items-center justify-start">
      <motion.section className="min-w-fit flex flex-row items-center justify-start gap-2">
        {initialData?.map((review, i) => (
          <SmallReviewCard key={review.id} index={i} review={review} />
        ))}
      </motion.section>
    </motion.section>
  );
}
