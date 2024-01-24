"use client";

import { safeUserType } from "@/types/safeuser";
import { Comment, Feedback, Listing, User } from "@prisma/client";
import React, { useMemo, useState } from "react";
import Avatar from "../ui/Avatar";
import RateInput from "../inputs/RateInput";
import { formatDistanceToNowStrict } from "date-fns";
import Button from "../inputs/Button";
import { BiCalendar, BiHome } from "react-icons/bi";
import ListingPreview from "../preview/ListingPreview";
import { twMerge } from "tailwind-merge";
import FeedBackLikeButton from "../inputs/FeedBackLikeButton";
import CommentPreview from "../preview/CommentPreview";

const FeedbackCard = ({
  feedback,
  user,
}: {
  user: User | safeUserType;
  feedback: Feedback & { user: User; listing: Listing; comments: Comment[] };
}) => {
  const [ListingExpand, setListingExpand] = useState(false);
  const [commentExpand, setCommentExpand] = useState(false);

  const createdAt = useMemo(() => {
    if (!feedback.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(feedback.createdAt));
  }, [feedback.createdAt]);

  return (
    <article
      className={twMerge(
        "p-3 rounded-md drop-shadow-2xl flex flex-col items-start justify-between relative gap-2 bg-neutral-50 cursor-default z-0  ",
        ListingExpand ? "z-[2]" : "z-0"
      )}
    >
      <section className="flex flex-col gap-3 items-start justify-start relative z-10">
        <div className="min-w-full flex items-center justify-between  gap-1   z-0">
          <div className="flex items-center justify-start gap-1">
            <Avatar userId={feedback.userId} />
            <div className="flex flex-col items-start justify-start  ">
              <p className="text-rose-500 font-bold text-[15px]">
                {feedback.user.name}
              </p>
              <p className="text-neutral-400 text-[11px] ">
                {feedback.user.email}
              </p>
            </div>
          </div>
          <ListingPreview
            expand={ListingExpand}
            setExpand={setListingExpand}
            Listing={feedback.listing}
          />
        </div>
        <p className="text-[15px] font-semibold font-sans leading-1 capitalize text-left line-clamp-4 text-black">
          {feedback.body}
        </p>
      </section>
      <section className="w-full flex items-center justify-between gap-2 relative z-0 pe-2">
        <section className="w-1/3 flex flex-wrap md:flex-nowrap items-center justify-start gap-1">
          <RateInput
            className="p-0 max-w-fit relative "
            val={feedback.rating}
            readOnly
            size="15px"
            id={feedback.id}
          />
          <span className="max-w-fit text-[13px] whitespace-nowrap font-semibold text-neutral-400 lowercase pt-1 flex items-center gap-1">
            <BiCalendar size={13} />
            {createdAt} ago
          </span>
        </section>
        <section className="w-2/3 flex items-center justify-end gap-2 ">
          <FeedBackLikeButton
            listingId={feedback.listing.id}
            feedBackId={feedback.id}
            user={user}
            likingIds={feedback.likingIds}
          />
          <CommentPreview
            listingId={feedback.listing.id}
            feedbackId={feedback.id}
            commentsIds={feedback.comments.map((c) => c.authorId)}
          />
        </section>
      </section>
    </article>
  );
};

export default FeedbackCard;
