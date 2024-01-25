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
}: {
  commentsIds: string[];
  isOpen: boolean;
}) => {
  const { onOpen, onClose, feedbackId, listingId } =
    useFeedBackCommentsPreview();

  const Icon: IconType = isOpen ? IoMdClose : TfiCommentAlt;

  return (
    <button
      className={twMerge(
        isOpen
          ? "sticky top-0 left-0 min-w-full flex items-center justify-center gap-2 p-3 border-b-[1px]  bg-neutral-200 "
          : " min-w-fit text-[15px] rounded-md drop-shadow-2xl flex items-center justify-center gap-1  "
      )}
    >
      {isOpen && (
        <span className="capitalize font-bold w-fit  ca">others thoughts</span>
      )}
      {!isOpen && commentsIds.length}
      <Icon
        className={twMerge(
          " transition-all cursor-pointer",
          isOpen
            ? "text-black hover:scale-125 border-[1px] border-black hover:border-blue-500 hover:text-blue-500 rounded-full  "
            : "text-blue border-black"
        )}
        onClick={() => {
          if (!isOpen && !!feedbackId && !!listingId) {
            onOpen({ feedbackId, listingId });
          } else onClose();
        }}
        size={isOpen ? 25 : 15}
      />
    </button>
  );
};

export default CommentPreviewButton;
