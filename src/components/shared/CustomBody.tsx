"use client";
import { useTheme } from "@/hooks/useTheme";
import React, { ReactNode, useEffect } from "react";
import { twMerge } from "tailwind-merge";

const Body = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { mode, setTheme } = useTheme();
  useEffect(() => {
    setTheme(localStorage.getItem("airbnb_theme_mode") as unknown);
  }, []);

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
