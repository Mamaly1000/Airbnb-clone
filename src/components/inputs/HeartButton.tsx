"use client";
import { safeUserType } from "@/types/safeuser";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

const HeartButton = ({
  id,
  user,
}: {
  id: string;
  user?: safeUserType | null;
}) => {
  return (
    <button
      onClick={() => {}}
      className={twMerge(
        ` rounded-full w-[45px] h-[45px] drop-shadow-2xl flex items-center justify-center transition-all`,
        true ? "bg-red-500" : "bg-neutral-900"
      )}
    >
      <AiOutlineHeart className={` fill-white stroke-white`} size={30} />
    </button>
  );
};

export default HeartButton;
