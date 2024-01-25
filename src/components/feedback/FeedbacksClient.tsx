import { Feedback, User } from "@prisma/client";
import React from "react";
import EmptyState from "../ui/EmptyState";
import { safeUserType } from "@/types/safeuser";
import Container from "../ui/Container";
import Heading from "../form/Heading";
import FeedbackCard from "../card/FeedbackCard";

const FeedbacksClient = ({
  feedbacks,
  user,
}: {
  user: User | safeUserType;
  feedbacks: Feedback[];
}) => {
  if (feedbacks.length === 0) {
    return (
      <EmptyState
        subTitle="no feedbacks"
        title="here there is no users feedbacks about properties and their reservations experiences."
        redirect
      />
    );
  }
  return (
    <Container classname="min-w-full relative z-0">
      <Heading
        title="properties feedbacks"
        subtitle="here you can see users feedbacks about properties and their reservations experiences."
      />
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 ">
        {feedbacks.map((feedback) => {
          return (
            <FeedbackCard
              key={feedback.id}
              feedback={feedback as any}
              user={user}
            />
          );
        })}
      </section>
    </Container>
  );
};

export default FeedbacksClient;
