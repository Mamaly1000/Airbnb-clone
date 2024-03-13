"use client";
import useFavorite from "@/hooks/useFavorite";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

const HeartButton = ({ id }: { id: string }) => {
  const { hasFavorited, toggleFavorite, isLoading } = useFavorite({
    listing_id: id,
  });

  return (
    <button
      onClick={(e) => toggleFavorite(e)}
      className={twMerge(
        ` rounded-full w-[45px] h-[45px] drop-shadow-2xl flex items-center justify-center transition-all outline-none focus:outline-none`,
        hasFavorited ? "bg-red-500" : "bg-neutral-900",
        isLoading ? "animate-pulse" : "animate-none"
      )}
    >
      <AiOutlineHeart className={` fill-white stroke-white`} size={30} />
    </button>
  );
};

export default HeartButton;
