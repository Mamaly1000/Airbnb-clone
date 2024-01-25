"use client";
import useComments from "@/hooks/useComments";
import { useFeedBackCommentsPreview } from "@/hooks/useFeedBackCommentsPreview";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge"; 
import useUser from "@/hooks/useUser";
import CommentPreviewButton from "../inputs/CommentPreviewButton";
import CommentsFeed from "../comments/CommentsFeed"; 
import CreateCommentForm from "../form/CreateCommentForm";

const CommentPreview = ({
  listingId,
  feedbackId,
  commentsIds = [],
}: {
  commentsIds: string[];
  listingId: string;
  feedbackId: string;
}) => {
  const {
    listingId: mainListingId,
    feedbackId: mainFeedbackId,
    isOpen,
    onOpen,
    onClose,
  } = useFeedBackCommentsPreview();
  const { user } = useUser();
  const [comment, setComment] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { comments, isLoading: commentLoading } = useComments(mainFeedbackId);

  const onComment = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!!comment) {
      try {
        setLoading(true);
      } catch (error) {
        console.log(error);
        toast.error("something went wrong!");
      } finally {
        setLoading(false);
      }
    }
  };

  const isUnique = useMemo(() => {
    return !!(listingId === mainListingId && feedbackId === mainFeedbackId);
  }, [listingId, mainListingId, feedbackId, mainFeedbackId]);

  return (
    <section
      className={twMerge(
        "min-w-[45px] max-w-[35px] min-h-[35px] relative flex items-center justify-end ",
        isUnique && isOpen ? "z-40" : "z-0"
      )}
    >
      <article
        onClick={() => {
          onOpen({ feedbackId, listingId });
        }}
        className={twMerge(
          "transition-all  duration-300",
          isOpen && isUnique
            ? "md:w-[350px] rounded-md md:h-[300px] md:max-h-[300px] fixed   w-screen max-w-full md:max-w-[340px] h-[400px] max-h-[400px] overflow-y-auto md:absolute md:top-0 md:-end-2 top-[-0] end-0 bg-neutral-100 z-40"
            : "w-[45px] h-fit absolute  py-1 rounded-md flex items-center justify-center gap-1 text-white bg-blue-500 "
        )}
      >
        <CommentPreviewButton
          feedbackId={feedbackId}
          listingId={listingId}
          commentsIds={commentsIds}
          isOpen={isOpen && isUnique}
        />
        {isOpen && isUnique && <CreateCommentForm />}
        {isOpen && isUnique && (
          <CommentsFeed
            feedbackId={feedbackId} 
            comments={comments || []}
          />
        )}
      </article>
    </section>
  );
};

export default CommentPreview;
