"use client";
import { useReviewFilterModal } from "@/hooks/useReviewsFilterModal";
import React from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal";

const ReviewFilterModal = () => {
  const { onClose, isOpen } = useReviewFilterModal();
  const form = useForm({
    defaultValues: {
      min: 0,
      max: 0,
      listingId: "",
      userId: "",
      sortType: "",
    },
  });
  return (
    <Modal
      isOpen={isOpen}
      onChange={(val) => {
        if (!val) {
          onClose();
        }
      }}
    />
  );
};

export default ReviewFilterModal;
