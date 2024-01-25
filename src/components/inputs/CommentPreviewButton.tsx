"use client";
import { useFeedBackCommentsPreview } from "@/hooks/useFeedBackCommentsPreview";
import React from "react";
import { IconType } from "react-icons";
import { IoMdClose } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import { TfiCommentAlt } from "react-icons/tfi";

const CommentPreviewButton = ({
  isOpen,
  commentsIds,
  feedbackId,
  listingId,
}: {
  feedbackId: string;
  listingId: string;
  commentsIds: string[];
  isOpen: boolean;
}) => {
  const { onOpen, onClose } = useFeedBackCommentsPreview();

  const Icon: IconType = isOpen ? IoMdClose : TfiCommentAlt;

  return (
    <button
      className={twMerge(
        isOpen
          ? "sticky top-0 left-0 z-10 min-w-full flex items-center justify-center gap-2 p-3 border-b-[1px]  bg-neutral-200 "
          : " min-w-fit text-[15px] rounded-md drop-shadow-2xl flex items-center justify-center gap-1  "
      )}
      onClick={(e) => {
        if (!isOpen) {
          onOpen({ feedbackId, listingId });
        } else {
          e.stopPropagation();
          onClose();
        }
      }}
    >
      {isOpen && (
        <span className="capitalize font-bold w-fit  text-blue-500">others thoughts</span>
      )}
      {!isOpen && commentsIds.length}
      <Icon
        className={twMerge(
          " transition-all cursor-pointer",
          isOpen
            ? " hover:scale-125 border-[1px] border-blue-500 text-blue-500 rounded-full  "
            : "text-white  "
        )}
        size={isOpen ? 25 : 15}
      />
    </button>
  );
};

export default CommentPreviewButton;
