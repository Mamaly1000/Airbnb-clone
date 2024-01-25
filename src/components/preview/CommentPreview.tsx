"use client";
import useComments from "@/hooks/useComments";
import { useFeedBackCommentsPreview } from "@/hooks/useFeedBackCommentsPreview";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import Loader from "../ui/Loader";
import useUser from "@/hooks/useUser";
import CommentPreviewButton from "../inputs/CommentPreviewButton";
import CommentsFeed from "../comments/CommentsFeed";
import Button from "../inputs/Button";
import { VscSend } from "react-icons/vsc";
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
          if (!isOpen) {
            onOpen({ feedbackId, listingId });
          }
        }}
        className={twMerge(
          "transition-all  duration-300",
          isOpen && isUnique
            ? "md:w-[350px] md:h-[300px] md:max-h-[300px] overflow-y-auto absolute top-0 w-[calc(60vw+100px)] -end-4 md:-end-2 bg-neutral-100 z-40"
            : "w-[45px] h-fit absolute  py-1 rounded-md flex items-center justify-center gap-1 text-white bg-blue-500 "
        )}
      >
        <CommentPreviewButton
          commentsIds={commentsIds}
          isOpen={isOpen && isUnique}
        />
        {isOpen && isUnique && <CreateCommentForm />}
        {isOpen &&
          isUnique &&
          (user ? (
            <>
              {!commentLoading ? (
                <CommentsFeed
                  feedbackId={feedbackId}
                  user={user}
                  comments={comments}
                />
              ) : (
                <Loader
                  className="min-w-full flex items-center justify-center h-[200px]"
                  size={30}
                />
              )}
            </>
          ) : (
            <Loader
              className="min-w-full flex items-center justify-center h-[200px]"
              size={30}
            />
          ))}
      </article>
    </section>
  );
};

export default CommentPreview;
