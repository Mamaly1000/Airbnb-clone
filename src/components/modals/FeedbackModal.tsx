"use client";
import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import { useFeedbackModal } from "@/hooks/useFeedbackModal";
import RateInput from "../inputs/RateInput";
import TextArea from "../inputs/TextArea";
import Heading from "../form/Heading";
const FeedbackModal = () => {
  const { reservationId, listingId, onClose, isOpen } = useFeedbackModal();

  const [isLoading, setLoading] = useState(false);
  const [rate, setRate] = useState(0);
  const [message, setMessage] = useState("");

  const onSubmit = useCallback(() => {}, []);

  return (
    <Modal
      isOpen={isOpen}
      onChange={(val) => {
        if (!val) {
          onClose();
        }
      }}
      body={
        <section className=" flex items-start justify-start gap-8 flex-col min-h-fit">
          <Heading
            title="share your experience with us"
            subtitle="your feedback is so valuable for us"
          />
          <RateInput
            disabled={isLoading}
            val={1}
            onChange={(val) => setRate(val)}
          />
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
            placeholder="write your thoughts and recommendations"
          />
        </section>
      }
      disable={isLoading}
      footer={{
        primary: {
          label: "submit",
          onClick: onSubmit,
        },
      }}
      header={{
        title: "Your Feedback",
        close: () => {
          onClose();
        },
      }}
    />
  );
};

export default FeedbackModal;
