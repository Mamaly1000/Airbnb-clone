"use client";
import React from "react";
import EmptyState from "../ui/EmptyState";
import { safeUserType } from "@/types/safeuser";
import Container from "../ui/Container";
import ReviewPagination from "../pagination/ReviewPagination";
import ReviewList from "../lists/ReviewList";
import ReviewOverview from "../review/ReviewOverview";
import { isNull } from "lodash";
import { safeListingType } from "@/types/safeListing";
import { safeReviewType } from "@/types/safeReviewType";
import dynamic from "next/dynamic";
import ListingBar from "../review/ListingBar";

const SearchReviewInput = dynamic(
  () => import("./../search-inputs/SearchReviewInput"),
  {
    ssr: false,
  }
);

const FeedbacksClient = ({
  user,
  listing,
  overallData,
  searchParams,
  reviews,
  pagination,
  params,
}: {
  pagination: {
    hasMore: boolean;
    maxPages: number;
    total: number;
  };
  reviews: safeReviewType[];
  params: {
    id?: string;
  };
  searchParams?: {
    search?: string;
  };
  listing: safeListingType | null;
  user?: safeUserType | null;
  overallData: any;
}) => {
  if (isNull(listing) || isNull(user)) {
    return (
      <EmptyState
        redirect
        title="there is no review for this listing."
        subTitle="Please check back later"
      />
    );
  }

  return (
    <>
      <Container classname="pt-52 md:pt-32">
        <ReviewOverview listing={listing} overallRates={overallData} />
        <hr className="min-w-full min-h-[2px] bg-neutral-200 dark:bg-neutral-700 my-10 border-none" />
        <SearchReviewInput prevValue={searchParams?.search} />
      </Container>
      <ReviewList
        header={{
          title: "All Reviews",
          subTitle: " There are total of " + pagination?.total + " reviews.",
        }}
        emptyState={
          searchParams?.search
            ? {
                title: "no review were found",
                subTitle: "Try to change your filter or keyword",
              }
            : {
                title: "No Reviews Yet",
                subTitle: "Be the first to leave a review.",
              }
        }
        user={user}
        initailData={reviews}
        pagination={pagination}
        params={{
          listingId: params.id,
          search: searchParams?.search,
        }}
      />
      <ReviewPagination
        user={user}
        pagination={pagination}
        params={{
          listingId: params.id,
          search: searchParams?.search,
        }}
      />
      <ListingBar listing={listing} />
    </>
  );
};

export default FeedbacksClient;
