"use client"
import React, { useState } from "react";
import { VscSend } from "react-icons/vsc";
import TextArea from "../inputs/TextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import axios from "axios";
import { useFeedBackCommentsPreview } from "@/hooks/useFeedBackCommentsPreview";
import useComments from "@/hooks/useComments";
import { useRouter } from "next/navigation";

const commentSchema = z.object({
  message: z.string({ required_error: "input can not be empty" }),
});

const CreateCommentForm = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const { listingId, feedbackId } = useFeedBackCommentsPreview();
  const { mutate } = useComments(feedbackId);
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof commentSchema>) => {
      try {
        if (listingId && feedbackId) {
          setLoading(true);
          await axios
            .post("/api/comments", {
              listingId,
              feedbackId,
              message: values.message,
            })
            .then((res) => {
              toast.success(res.data.message);
              mutate();
              form.reset();
              router.refresh();
            });
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong!");
      } finally {
        setLoading(false);
      }
    }
  );

  return (
    <form
      onSubmit={onSubmit}
      className="animate-slideIn min-w-full flex items-start justify-between gap-3 text-left p-2"
    >
      <TextArea
        value={form.watch("message")}
        register={form.register("message", { required: true })}
        onChange={(e) => form.setValue("message", e.target.value)}
        disabled={isLoading}
        placeholder="write your thoughts and questions"
      />
      <button
        className={twMerge(
          "min-w-[45px] hover:scale-110 hover:bg-opacity-70 max-w-[45px] min-h-[45px] max-h-[45px] rounded-full flex items-center justify-center  bg-rose-500 text-white disabled:cursor-not-allowed   transition-all ",
          isLoading ? "animate-pulse" : ""
        )}
        disabled={isLoading}
      >
        <VscSend size={15} />
      </button>
    </form>
  );
};

export default CreateCommentForm;
