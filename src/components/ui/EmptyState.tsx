"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Heading from "../form/Heading";
import Button from "../inputs/Button";

const EmptyState = ({
  showReset = false,
  subTitle = "Try Changing or Removing some of your filters.",
  title = "No exact matches",
}: {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-2 ">
      <Heading title={title} center subtitle={subTitle} />
      <div className="w-48 mt-4 flex items-center justify-center">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
