"use client";
import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import { useFeedbackModal } from "@/hooks/useFeedbackModal";
import RateInput from "../inputs/RateInput";
import TextArea from "../inputs/TextArea";
import Heading from "../form/Heading";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loader from "../ui/Loader";
import useProperty from "@/hooks/useProperty";

const feedbackSchema = z.object({
  message: z
    .string({
      required_error: "please write your feedback message",
    })
    .min(20, "minimum characters are 20"),
  rating: z.number({ required_error: "please rate your reservation" }),
});

const FeedbackModal = () => {
  const router = useRouter();
  const { reservationId, listingId, onClose, isOpen } = useFeedbackModal();

  const { property } = useProperty(listingId);

  const [isLoading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      message: "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof feedbackSchema>) => {
      try {
        setLoading(true);
        if (reservationId && values && listingId) {
          await axios
            .post("/api/feedback", {
              ...values,
              reservationId,
              listingId,
            })
            .then((res) => {
              toast.success(res.data.message);
              onClose();
              form.reset();
              router.refresh();
            });
        } else {
          toast.error("missing fields");
        }
      } catch (error) {
        toast.error("something went wrong!");
      } finally {
        setLoading(false);
      }
    }
  );

  return (
    <Modal
      isOpen={isOpen}
      onChange={(val) => {
        if (!val) {
          onClose();
        }
      }}
      body={
        <form
          onSubmit={onSubmit}
          className=" flex items-start justify-start gap-8 flex-col min-h-fit"
        >
          {reservationId && listingId ? (
            <>
              <Heading
                title={`share your experience about ${property?.title}`}
                subtitle="your feedback is so valuable for us"
              />
              <RateInput
                id={listingId}
                disabled={isLoading}
                val={form.watch("rating")}
                onChange={(val) => form.setValue("rating", val)}
                tooltip
              />
              <TextArea
                value={form.watch("message")}
                onChange={(e) => form.setValue("message", e.target.value)}
                disabled={isLoading}
                placeholder="write your thoughts and recommendations"
                register={form.register("message", {
                  required: true,
                })}
              />
            </>
          ) : (
            <Loader className="min-w-full h-[300px] flex items-center justify-center" />
          )}
        </form>
      }
      disable={isLoading}
      footer={{
        primary: {
          label: "submit",
          onClick: onSubmit,
        },
        secondary: {
          label: "cancel",
          onClick: () => {
            form.reset();
            onClose();
          },
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
