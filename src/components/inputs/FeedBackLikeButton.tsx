import { safeUserType } from "@/types/safeuser";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { BiLike } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

const FeedBackLikeButton = ({
  listingId,
  feedBackId,
  user,
  likingIds = [],
}: {
  likingIds?: string[];
  listingId: string;
  feedBackId: string;
  user: User | safeUserType;
}) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const onLike = useCallback(
    async (e: any) => {
      e.stopPropagation();
      try {
        setLoading(true);
        await axios
          .patch(`/api/feedback/${feedBackId}`, { listingId })
          .then((res) => {
            toast.success(res.data.message);
            router.refresh();
          });
      } catch (error) {
        toast.error("something went wrong!");
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const isLike = useMemo(() => {
    const like = likingIds?.includes(user.id);
    return !!like;
  }, [user, likingIds]);

  return (
    <button
      disabled={isLoading}
      onClick={onLike}
      className={twMerge(
        "cursor-pointer disabled:cursor-not-allowed transition-all disabled:opacity-50",
        isLoading ? "animate-pulse" : "",
        "px-2 py-1 text-[15px] rounded-md drop-shadow-2xl flex items-center justify-center gap-1   ",
        isLike ? "bg-rose-500 text-white" : "bg-transparent text-rose-500"
      )}
    >
      {likingIds.length}
      <BiLike
        size={15}
        className={twMerge(isLike ? " text-white" : " text-rose-500 ","transition-all")}
      />
    </button>
  );
};

export default FeedBackLikeButton;
