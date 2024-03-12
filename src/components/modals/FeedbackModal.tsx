"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { useFeedbackModal } from "@/hooks/useFeedbackModal";
import RateInput from "../inputs/RateInput";
import TextArea from "../inputs/TextArea";
import Heading from "../form/Heading";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loader from "../ui/Loader";
import useProperty from "@/hooks/useProperty";
import axios from "axios";
import toast from "react-hot-toast";

const feedbackSchema = z.object({
  message: z
    .string({
      required_error: "please write your feedback message",
    })
    .min(20, "minimum characters are 20"),
  cleanliness: z.number({ required_error: "please rate cleanliness" }),
  accuracy: z.number({ required_error: "please rate accuracy" }),
  checkIn: z.number({ required_error: "please rate checkIn" }),
  communication: z.number({ required_error: "please rate communication" }),
  location: z.number({ required_error: "please rate location" }),
  value: z.number({ required_error: "please rate value" }),
});

const FeedbackModal = () => {
  const router = useRouter();
  const { reservationId, listingId, onClose, isOpen } = useFeedbackModal();

  const { property } = useProperty(listingId);

  const [isLoading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      message: "",
      cleanliness: 1,
      accuracy: 1,
      checkIn: 1,
      communication: 1,
      location: 1,
      value: 1,
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
                val={form.watch("cleanliness")}
                onChange={(val) => form.setValue("cleanliness", val)}
                tooltip
                size="25px"
                label="cleanliness"
              />
              <RateInput
                size="25px"
                id={listingId}
                disabled={isLoading}
                val={form.watch("accuracy")}
                onChange={(val) => form.setValue("accuracy", val)}
                tooltip
                label="accuracy"
              />
              <RateInput
                size="25px"
                id={listingId}
                disabled={isLoading}
                val={form.watch("checkIn")}
                onChange={(val) => form.setValue("checkIn", val)}
                tooltip
                label="check-in"
              />
              <RateInput
                size="25px"
                id={listingId}
                disabled={isLoading}
                val={form.watch("communication")}
                onChange={(val) => form.setValue("communication", val)}
                tooltip
                label="communication"
              />
              <RateInput
                size="25px"
                id={listingId}
                disabled={isLoading}
                val={form.watch("location")}
                onChange={(val) => form.setValue("location", val)}
                tooltip
                label="location"
              />
              <RateInput
                size="25px"
                id={listingId}
                disabled={isLoading}
                val={form.watch("value")}
                onChange={(val) => form.setValue("value", val)}
                tooltip
                label="value"
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
