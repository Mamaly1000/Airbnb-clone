import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

const RateBox = ({
  label,
  value,
  Icon,
}: {
  label:
    | "cleanliness"
    | "accuracy"
    | "check in"
    | "communication"
    | "location"
    | "value";
  value: number[];
  Icon: IconType;
}) => {
  const average =
    value.reduce((acc, current) => {
      return (acc += current);
    }) / value.length;
  return (
    <article
      className={twMerge(
        " rounded-lg p-3 min-h-[190px] min-w-[190px] text-black dark:text-white flex flex-col items-start justify-between gap-2 font-light"
      )}
    >
      <div className="min-w-full max-w-full capitalize flex flex-col items-start justify-start gap-1 text-sm md:text-[20px]">
        <span>{label}</span>
        <span>{average}</span>
      </div>
      <Icon size={40} className="stroke-[1px]" />
    </article>
  );
};

export default RateBox;
