"use client";
import { safeUserType } from "@/types/safeuser";
import { Comment, User } from "@prisma/client";
import React, { useMemo } from "react";
import Avatar from "../ui/Avatar";
import { BiCalendar } from "react-icons/bi";
import { formatDistanceToNowStrict } from "date-fns";
import CommentLikeButton from "../inputs/CommentLikeButton";

const CommentCard = ({
  comment,
  user,
  feedbackId,
}: {
  feedbackId: string;
  comment: Comment & { author: User };
  user: User | safeUserType;
}) => {
  const createdAt = useMemo(() => {
    if (!comment.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(comment.createdAt));
  }, [comment.createdAt]);

  return (
    <article className="min-w-full flex flex-col gap-1 justify-between p-2 border-b-[1px] border-b-neutral-400">
      <section className="min-w-full flex items-start justify-start gap-3">
        <div className="flex items-center justify-start gap-1">
          <Avatar userId={comment.authorId} />
          <div className="flex flex-col items-start justify-start  ">
            <p className="text-rose-500 font-bold text-[15px]">
              {comment.author.name}
            </p>
            <p className="text-neutral-400 text-[11px] ">
              {comment.author.email}
            </p>
          </div>
        </div>
        <p className="min-w-full text-left capitalize font-semibold text-[13px] font-sans text-neutral-200 min-h-fit">
          {comment.message}
        </p>
      </section>
      <section className="min-w-full flex items-center justify-between gap-1">
        <span className="text-[13px] whitespace-nowrap font-semibold text-neutral-400 lowercase pt-1 flex items-center gap-1">
          <BiCalendar size={13} />
          {createdAt} ago
        </span>
        <CommentLikeButton
          commentId={comment.id}
          feedbackId={feedbackId}
          user={user}
          likingIds={comment.likingIds}
        />
      </section>
    </article>
  );
};

export default CommentCard;
