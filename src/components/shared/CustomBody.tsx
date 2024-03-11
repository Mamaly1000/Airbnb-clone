"use client";
import { useTheme } from "@/hooks/useTheme";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Body = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { mode } = useTheme();
  return (
    <body
      className={twMerge(
        "min-h-screen bg-white dark:bg-neutral-800 text-black dark:text-[#e7e9ea] relative",
        mode,
        className
      )}
    >
      {children}
    </body>
  );
};

export default Body;
