import useComments from "@/hooks/useComments";
import { safeUserType } from "@/types/safeuser";
import { User } from "@prisma/client";
import axios from "axios";
import { includes } from "lodash";
import React, { useMemo, useState } from "react";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { BiLike } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

const CommentLikeButton = ({
  likingIds = [],
  user,
  commentId,
  feedbackId,
  listingId,
}: {
  feedbackId: string;
  commentId: string;
  likingIds?: string[];
  user: User | safeUserType;
  listingId: string;
}) => {
  const { mutate } = useComments(feedbackId);
  const [isLoading, setLoading] = useState(false);

  const onLike = useCallback(
    async (e: any) => {
      e.stopPropagation();
      try {
        if (user.id && commentId) {
          setLoading(true);
          await axios
            .patch(`/api/comments/${commentId}`, { listingId })
            .then((res) => {
              toast.success(res.data.message);
              mutate();
            });
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong!");
      } finally {
        setLoading(false);
      }
    },
    [user, commentId, mutate, setLoading]
  );

  const isLike = useMemo(() => {
    const isLike = includes(likingIds, user.id);
    return isLike;
  }, [user, likingIds]);

  return (
    <button
      disabled={isLoading}
      onClick={onLike}
      className={twMerge(
        "cursor-pointer",
        isLoading ? "animate-pulse" : "",
        "px-2 py-1 text-[15px] rounded-md drop-shadow-2xl flex items-center justify-center gap-1   ",
        isLike ? "bg-rose-500 text-white" : "bg-transparent text-rose-500"
      )}
    >
      {likingIds.length}
      <BiLike
        size={15}
        className={twMerge(isLike ? " text-white" : " text-rose-500 ")}
      />
    </button>
  );
};

export default CommentLikeButton;
