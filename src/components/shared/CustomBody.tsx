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
  return <body className={twMerge("bg-white dark:bg-neutral-800", mode, className)}>{children}</body>;
};

export default Body;
