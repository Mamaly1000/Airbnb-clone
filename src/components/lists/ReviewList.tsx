"use client";
import React from "react";
import { safeReviewType } from "@/types/safeReviewType";
import Container from "../ui/Container";
import { isEmpty } from "lodash";
import EmptyState from "../ui/EmptyState";
import Heading from "../form/Heading";
import ReviewCard from "../card/ReviewCard";
import { safeUserType } from "@/types/safeuser";
import { twMerge } from "tailwind-merge";
import { FeedbackQueryType } from "@/actions/getFeedbacks";

const ReviewList = ({
  initailData,
  emptyState,
  header,
  user,
  className,
  pagination,
}: {
  className?: string;
  params?: FeedbackQueryType;
  user?: safeUserType | null;
  emptyState?: {
    title: string;
    subTitle?: string;
  };
  header?: {
    title: string;
    subTitle?: string;
  };
  initailData: safeReviewType[];
  pagination: { hasMore: boolean; maxPages: number; total: number };
}) => {
  if (isEmpty(initailData)) {
    return (
      <EmptyState
        redirect
        title={emptyState?.title || "No Reviews Yet"}
        subTitle={emptyState?.subTitle || "Be the first to leave a review."}
      />
    );
  }
  return (
    <Container
      classname={twMerge(
        "min-w-full max-w-full overflow-hidden flex flex-col items-start justify-start",
        header && "gap-8",
        pagination.hasMore ? "pb-2" : "pb-4",
        className
      )}
    >
      {header && <Heading title={header.title} subtitle={header?.subTitle} />}
      <div className="min-w-full max-w-full grid grid-cols-1 md:grid-cols-2 gap-2">
        {initailData.map((r, i) => {
          return <ReviewCard index={i} review={r} user={user} key={r.id} />;
        })}
      </div>
    </Container>
  );
};

export default ReviewList;
