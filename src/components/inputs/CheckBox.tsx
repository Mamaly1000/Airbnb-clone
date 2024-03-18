"use client";
import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

const CheckBox = ({
  label,
  Icon,
  onClick,
  index,
  isActive,
}: {
  label: string;
  Icon: IconType;
  onClick: () => void;
  index: number;
  isActive?: boolean;
}) => {
  return (
    <button className={twMerge("max-w-fit px-3 py-2 rounded-lg flex items-center justify-center gap-2")}>
      <div className="min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] flex items-center justify-center p-[1px] rounded-[5px] drop-shadow-2xl"></div>
    </button>
  );
};

export default CheckBox;
