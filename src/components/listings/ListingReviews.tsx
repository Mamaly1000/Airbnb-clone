import { isEmpty, isNull } from "lodash";
import React from "react";
import EmptyState from "../ui/EmptyState";
import { motion } from "framer-motion";
import SmallReviewCard from "../card/SmallReviewCard";
import { safeReviewType } from "@/types/safeReviewType";
import { twMerge } from "tailwind-merge";
import Button from "../inputs/Button";
import { useRouter } from "next/navigation";
export type listingReviewQueryType = {
  userId?: string;
  type?: "favorites" | "";
  limit?: number;
  listingId?: string;
  page?: number;
};
export default async function ListingReviews({
  reviewsData,
  listingId,
}: {
  listingId: string;
  reviewsData: {
    reviews: safeReviewType[];
    pagination: { hasMore: boolean; maxPages: number; total: number };
  };
}) {
  const router = useRouter();
  if (isEmpty(reviewsData?.reviews) || isNull(reviewsData?.reviews)) {
    return <EmptyState small title="no avialable review" subTitle="this listing has no review" />;
  }
  return (
    <motion.section
      className={twMerge(`
    min-w-full max-w-full max-h-fit overflow-hidden
      flex items-center justify-start flex-col gap-2
    `)}
    >
      <motion.section className="min-w-full min-h-fit max-h-fit overflow-y-hidden py-1 max-w-full flex flex-row items-center justify-start gap-2 px-1 overflow-x-auto">
        {reviewsData.reviews?.map((review, i) => (
          <SmallReviewCard key={review.id} index={i} review={review} />
        ))}
      </motion.section>
      {reviewsData.pagination.hasMore && (
        <Button onClick={() => router.push(`/reviews/${listingId}`)}>
          view all {reviewsData.pagination.total} reviews
        </Button>
      )}
    </motion.section>
  );
}
