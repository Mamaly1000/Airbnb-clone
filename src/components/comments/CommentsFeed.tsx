"use client";
import { Comment } from "@prisma/client";
import React from "react";
import CommentCard from "../card/CommentCard";

const CommentsFeed = ({
  comments = [],
  feedbackId,
}: {
  feedbackId: string;
  comments: Comment[];
}) => {
  return (
    <section className="animate-slideIn min-w-full flex flex-col items-start justify-start border-t-[1px] border-t-neutral-400 relative z-0">
      {comments.map((c) => (
        <CommentCard feedbackId={feedbackId} comment={c as any} key={c.id} />
      ))}
      {comments.length === 0 && (
        <p className="text-[14px] min-w-full min-h-[100px] flex items-center justify-center text-neutral-400 capitalize">
          no comment...
        </p>
      )}
    </section>
  );
};

export default CommentsFeed;
