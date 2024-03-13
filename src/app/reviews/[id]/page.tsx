import getCurrentUser from "@/actions/getCurrentUser";
import { getFeedbacks } from "@/actions/getFeedbacks";
import { getListingById } from "@/actions/getListingById";
import React from "react"; 
import FeedbacksClient from "../../../components/feedback/FeedbacksClient";

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

  return (
    <FeedbacksClient
      params={params}
      pagination={pagination}
      reviews={reviews}
      searchParams={searchParams}
      listing={listing}
      overallData={overallData}
      user={user}
    />
  );
};

export default ReviewPage;
