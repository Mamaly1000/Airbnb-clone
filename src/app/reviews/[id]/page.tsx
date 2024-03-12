import getCurrentUser from "@/actions/getCurrentUser";
import { getFeedbacks } from "@/actions/getFeedbacks";
import { getListingById } from "@/actions/getListingById";
import ReviewList from "@/components/lists/ReviewList";
import ReviewOverview from "@/components/review/ReviewOverview";
import SearchReviewInput from "@/components/search-inputs/SearchReviewInput";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import { isEmpty, isNull } from "lodash";
import React from "react";

const ReviewPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { search?: string };
}) => {
  const listing = await getListingById(params.id);
  const user = await getCurrentUser();
  const { overallData, pagination, reviews } = await getFeedbacks({
    listingId: params.id,
    search: searchParams?.search,
  });

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
    <Container main classname="min-w-full max-w-full pt-32">
      {/* <ReviewOverview listing={listing} overallRates={overallData} /> */}
      <hr className="min-w-full min-h-[2px] bg-neutral-200 dark:bg-neutral-700 my-10 border-none" />
      <SearchReviewInput prevValue={searchParams?.search} />
      <ReviewList
        header={{
          title: "All Reviews",
          subTitle: " There are total of " + pagination?.total + " reviews.",
        }}
        user={user}
        initailData={reviews}
        pagination={pagination}
      />
    </Container>
  );
};

export default ReviewPage;
