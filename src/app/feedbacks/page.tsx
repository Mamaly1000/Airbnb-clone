import getCurrentUser from "@/actions/getCurrentUser";
import { getFeedbacks } from "@/actions/getFeedbacks";
import FeedbacksClient from "@/components/feedback/FeedbacksClient";
import EmptyState from "@/components/ui/EmptyState";
import React from "react";

const Feedbacks = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <EmptyState
        title="Unauthorized!"
        subTitle="Please login to your account."
      />
    );
  }

  const feedbacks = await getFeedbacks();

  return <FeedbacksClient feedbacks={feedbacks} user={user} />;
};

export default Feedbacks;
