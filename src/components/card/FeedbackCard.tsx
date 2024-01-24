"use client";

import { safeUserType } from "@/types/safeuser";
import { Feedback, Listing, User } from "@prisma/client";
import React, { useMemo } from "react";
import Avatar from "../ui/Avatar";
import RateInput from "../inputs/RateInput";
import { formatDistanceToNowStrict } from "date-fns";
import Button from "../inputs/Button";
import { BiCalendar, BiHome } from "react-icons/bi";

const FeedbackCard = ({
  feedback,
  user,
}: {
  user: User | safeUserType;
  feedback: Feedback & { user: User; listing: Listing };
}) => {
  const createdAt = useMemo(() => {
    if (!feedback.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(feedback.createdAt));
  }, [feedback.createdAt]);

  return (
    <article className="p-3 rounded-md drop-shadow-2xl flex flex-col items-start justify-between relative gap-2 bg-neutral-50 cursor-default">
      <section className="flex flex-col gap-1 items-start justify-start">
        <div className="min-w-full flex items-center justify-between  gap-1 ">
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
          <Button
            Icon={BiHome}
            iconSize={20}
            className="min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] flex items-center justify-center rounded-full bg-rose-500 text-white p-0 px-0 py-0"
          />
        </div>
        <p className="text-[15px] font-semibold font-sans leading-1 capitalize text-left line-clamp-4 text-black">
          {feedback.body}
        </p>
      </section>
      <section className="flex items-center justify-between gap-2 ">
        <section className="w-fit flex items-center justify-start gap-2">
          <RateInput
            className="p-0 min-w-fit"
            val={feedback.rating}
            readOnly
            size="15px"
            id={feedback.id}
          />
          <span className="text-[13px] whitespace-nowrap font-semibold text-neutral-400 lowercase pt-1 flex items-center gap-1">
            <BiCalendar size={13}  />
            {createdAt} ago
          </span>
        </section>
        <section className="flex items-center justify-end gap-2 "></section>
      </section>
    </article>
  );
};

export default FeedbackCard;
