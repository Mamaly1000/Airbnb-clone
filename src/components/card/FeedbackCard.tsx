"use client";

import { safeUserType } from "@/types/safeuser";
import { Comment, Feedback, Listing, User } from "@prisma/client";
import React, { useMemo } from "react";
import Avatar from "../ui/Avatar";
import RateInput from "../inputs/RateInput";
import { formatDistanceToNowStrict } from "date-fns";
import { BiCalendar } from "react-icons/bi";
import ListingPreview from "../preview/ListingPreview";
import { twMerge } from "tailwind-merge";
import FeedBackLikeButton from "../inputs/FeedBackLikeButton";
import CommentPreview from "../preview/CommentPreview";
import { useFeedBackCommentsPreview } from "@/hooks/useFeedBackCommentsPreview";
import { useListingPreview } from "@/hooks/useListingPreview";

const FeedbackCard = ({
  feedback,
  user,
}: {
  user: User | safeUserType;
  feedback: Feedback & { user: User; listing: Listing; comments: Comment[] };
}) => {
  const { id } = useListingPreview();
  const isUniqueListing = useMemo(() => {
    return id === feedback.listingId ? true : false;
  }, [id, feedback.listingId]);

  const {
    isOpen: commentPreview,
    listingId: mainListingId,
    feedbackId: mainFeedbackId,
  } = useFeedBackCommentsPreview();

  const createdAt = useMemo(() => {
    if (!feedback.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(feedback.createdAt));
  }, [feedback.createdAt]);

  const isUnique = useMemo(() => {
    return !!(
      !!(
        feedback.listingId === mainListingId && feedback.id === mainFeedbackId
      ) && !!commentPreview
    );
  }, [
    feedback.listingId,
    mainListingId,
    feedback.id,
    mainFeedbackId,
    commentPreview,
  ]);

  return (
    <article
      className={twMerge(
        "p-3 rounded-md drop-shadow-2xl flex flex-col items-start justify-between relative gap-2 bg-neutral-50 cursor-default z-0  ",
        isUniqueListing || isUnique ? "z-20" : "z-0"
      )}
    >
      <section
        className={twMerge(
          "flex flex-col gap-3 items-start justify-start relative",
          isUniqueListing ? "z-20" : "z-0"
        )}
      >
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
            Listing={feedback.listing}
            listingId={feedback.listingId}
          />
        </div>
        <p className="text-[15px] font-semibold font-sans leading-1 capitalize text-left line-clamp-4 text-black">
          {feedback.body}
        </p>
      </section>
      <section
        className={twMerge(
          "w-full flex items-center justify-between gap-2 relative pe-2",
          isUnique ? "z-[2]" : "z-0"
        )}
      >
        <section className="w-1/3 flex flex-wrap md:flex-nowrap items-center justify-start gap-1">
          <RateInput
            className="p-0 max-w-[120px] min-w-[120px] relative "
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
