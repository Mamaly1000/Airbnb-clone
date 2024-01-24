"use client";
import { PuffLoader } from "react-spinners";

import React from "react";
import { twMerge } from "tailwind-merge";

const Loader = ({ className, size }: { size?: number; className?: string }) => {
  return (
    <div
      className={twMerge(
        "h-[70vh] flex flex-col justify-center items-center gap-3",
        className
      )}
    >
      <PuffLoader size={size || 100} color="red" />
    </div>
  );
};

export default Loader;
