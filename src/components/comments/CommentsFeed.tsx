import { Comment } from "@prisma/client";
import React from "react";
import CommentCard from "../card/CommentCard";
import { safeUserType } from "@/types/safeuser";

const CommentsFeed = ({
  comments,
  feedbackId,
  user,
}: {
  user: safeUserType;
  feedbackId: string;
  comments: Comment[];
}) => {
  return (
    <section className="animate-slideIn min-w-full flex flex-col items-start justify-start border-t-[1px] border-t-neutral-400">
      {comments.map((c) => (
        <CommentCard
          feedbackId={feedbackId}
          comment={c as any}
          key={c.id}
          user={user}
        />
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
