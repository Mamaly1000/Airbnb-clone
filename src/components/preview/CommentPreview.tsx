"use client";
import useComments from "@/hooks/useComments";
import { useFeedBackCommentsPreview } from "@/hooks/useFeedBackCommentsPreview";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import Loader from "../ui/Loader";
import CommentCard from "../card/CommentCard";
import useUser from "@/hooks/useUser";
import { IoMdClose } from "react-icons/io";
import { TfiCommentAlt } from "react-icons/tfi";
import { IconType } from "react-icons";
import { Comment } from "@prisma/client";

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

  const Icon: IconType = isOpen && isUnique ? IoMdClose : TfiCommentAlt;



  return (
    <section className="min-w-[30px] max-w-[35px] relative z-10 flex items-center justify-center ms-2">
      <article
        onClick={(e) => {
          if (!isOpen) {
            onOpen({ feedbackId, listingId });
          }
        }}
        className={twMerge(
          "transition-all",
          isOpen && isUnique
            ? "w-[300px] h-[300px] absolute top-0 end-0 bg-neutral-100"
            : "w-[45px] h-fit absolute  py-1 rounded-md flex items-center justify-center gap-1 text-white bg-blue-500 "
        )}
      >
        <section
          className={twMerge(
            isOpen && isUnique
              ? "min-w-full flex items-center justify-center gap-2 p-3 border-b-[1px] border-neutral-200 "
              : " min-w-fit text-[15px] rounded-md drop-shadow-2xl flex items-center justify-center gap-1  "
          )}
        >
          {isOpen && isUnique && (
            <span className="capitalize font-bold w-fit  ca">
              others thoughts
            </span>
          )}
          {!isOpen && !isUnique && commentsIds.length}
          <Icon
            className={twMerge(
              " transition-all cursor-pointer",
              isOpen && isUnique
                ? "text-black hover:scale-125 border-[1px] border-black hover:border-blue-500 hover:text-blue-500 rounded-full  "
                : "text-blue border-black"
            )}
            onClick={(e) => {
              if (!isOpen) {
                onOpen({ feedbackId, listingId });
              }
              e.stopPropagation();
              onClose();
            }}
            size={isOpen && isUnique ? 25 : 15}
          />
        </section>
        {isOpen &&
          isUnique &&
          (user ? (
            <>
              <form></form>
              {commentLoading ? (
                <section className="min-w-full flex flex-col items-start justify-start">
                  {comments.map((c) => (
                    <CommentCard
                      feedbackId={feedbackId}
                      comment={c as any}
                      key={c.id}
                      user={user}
                    />
                  ))}
                </section>
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
