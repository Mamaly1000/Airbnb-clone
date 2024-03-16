"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Heading from "../form/Heading";
import Button from "../inputs/Button";
import { twMerge } from "tailwind-merge";

const EmptyState = ({
  showReset = false,
  subTitle = "Try Changing or Removing some of your filters.",
  title = "No exact matches",
  refresh = false,
  redirect,
  small,
  className,
}: {
  className?: string;
  redirect?: boolean;
  refresh?: boolean;
  title?: string;
  subTitle?: string;
  showReset?: boolean;
  small?: boolean;
}) => {
  const router = useRouter();

  return (
    <div
      className={twMerge(
        `h-screen flex flex-col items-center 
        justify-center gap-2 bg-white
      dark:bg-neutral-800 px-3`,
        small && "h-[20vh]",
        className
      )}
    >
      <Heading title={title} center subtitle={subTitle} />
      <div className="w-48 mt-4 flex items-center justify-center">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
        {refresh && (
          <Button
            outline
            label="Refresh the page?"
            onClick={() => router.refresh()}
          />
        )}
        {redirect && (
          <Button
            outline
            className="capitalize"
            label="go to homepage"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
