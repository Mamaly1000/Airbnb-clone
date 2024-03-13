"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Loader from "../ui/Loader";
import { useRouter } from "next/navigation";
import { FeedbackQueryType, getFeedbacks } from "@/actions/getFeedbacks";
import ReviewList from "../lists/ReviewList";
import { safeUserType } from "@/types/safeuser";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
const ReviewPagination = ({
  pagination: reviewPagination,
  params,
  actionLabel,
  user,
}: {
  user?: safeUserType | null;
  actionLabel?: string;
  pagination: { hasMore: boolean; maxPages: number; total: number };
  params?: FeedbackQueryType;
}) => {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [pagination, setPagination] = useState(reviewPagination);
  const [lists, setLists] = useState<JSX.Element[]>([]);

  const getMoreReview = async () => {
    setLoading(true);
    await getFeedbacks({ ...params, page })
      .then((res) => {
        setPagination(res.pagination);
        setPage(page + 1);
        router.refresh();
        if (res.reviews.length > 0) {
          setLists([
            ...lists,
            <ReviewList
              className={twMerge(res.pagination.hasMore ? "pb-2" : "pb-4")}
              pagination={res.pagination}
              initailData={res.reviews}
              user={user}
            />,
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {lists}
      <AnimatePresence>
        {pagination.hasMore && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-w-full max-w-full flex items-center justify-center bg-white dark:bg-neutral-800 pt-5"
          >
            {isLoading && <Loader size={25} className="h-[100px]" />}
            {!isLoading && (
              <motion.button
                disabled={isLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  getMoreReview();
                }}
                className="min-w-full max-w-full px-3 py-2 drop-shadow-2xl bg-rose-500 text-white disabled:opacity-50 capitalize font-bold hover:scale-100 hover:opacity-50"
              >
                {actionLabel || "show more..."}
              </motion.button>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReviewPagination;
