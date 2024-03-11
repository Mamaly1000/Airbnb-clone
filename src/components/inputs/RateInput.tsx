"use client";
import React from "react";
import StarRatings from "react-star-ratings";
import { twMerge } from "tailwind-merge";

const defaultTooltipArray = [
  "not acceptable",
  "good",
  "very good",
  "excelent",
  "extra ordinary",
];

const RateInput = ({
  val,
  onChange,
  readOnly = false,
  tooltipArray,
  disabled,
  size,
  id,
  tooltip = false,
  className,
  space = "5px",
}: {
  className?: string;
  tooltip?: boolean;
  size?: string;
  disabled?: boolean;
  tooltipArray?: string[];
  readOnly?: boolean;
  val: number;
  id: string;
  onChange?: (val: number) => void;
  space?: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between gap-3 min-w-full transition-all max-h-fit",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
      onClick={(e) => {
        if (!readOnly || !disabled) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
    >
      <StarRatings
        rating={val}
        starRatedColor="rgb(244 63 94 / var(--tw-bg-opacity))"
        changeRating={(val) => {
          if (!disabled || !readOnly) {
            onChange!(val);
          }
        }}
        numberOfStars={5}
        name={id}
        starEmptyColor="#bab5b5ab"
        starHoverColor="rgb(244 63 94 / var(--tw-bg-opacity))"
        starDimension={size || "50px"}
        starSpacing={space}
      />
      {!!(tooltipArray && val && tooltip) && (
        <span className=" px-3 py-2 rounded-md flex capitalize font-semibold text-white bg-rose-500 text-[10px] max-w-fit">
          {tooltipArray[val - 1]}
        </span>
      )}
      {!!(tooltip && !!!tooltipArray && val) && (
        <span className=" px-3 py-2 rounded-md flex capitalize font-semibold text-white bg-rose-500 text-[10px] max-w-fit">
          {defaultTooltipArray[val - 1]}
        </span>
      )}
    </div>
  );
};

export default RateInput;
