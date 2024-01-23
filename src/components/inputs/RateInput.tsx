import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { twMerge } from "tailwind-merge";

const RateInput = ({
  val,
  onChange,
  readOnly = false,
  tooltipArray,
  disabled,
}: {
  disabled?: boolean;
  tooltipArray?: string[];
  readOnly?: boolean;
  val: number;
  onChange: (val: number) => void;
}) => {
  return (
    <div
      style={{
        direction: "ltr",
        fontFamily: "sans-serif",
        touchAction: "none",
      }}
    >
      <Rating
        readOnly={readOnly}
        value={val}
        isDisabled={disabled}
        className="min-w-full"
        onChange={onChange}
        transition="colors"
        style={{
          fill: "rgb(244 63 94 / var(--tw-bg-opacity))",
          color: "rgb(244 63 94 / var(--tw-bg-opacity))",
          stroke: "rgb(244 63 94 / var(--tw-bg-opacity))",
        }}
      />
    </div>
  );
};

export default RateInput;
