"use client";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import useDashboardSidebar from "@/hooks/useDashboardSidebar";

const DashboardContent = ({ children }: { children: ReactNode }) => {
  const { isCollapse, isOpen } = useDashboardSidebar();
  return (
    <section
      className={twMerge(
        `min-h-screen w-full min-w-full max-w-full flex flex-col items-start justify-start gap-4
          bg-white dark:bg-neutral-800 text-black dark:text-white`,
        isOpen
          ? isCollapse
            ? "col-span-12 sm:col-span-11 md:col-span-11 lg:col-span-11"
            : "col-span-12 sm:col-span-9 md:col-span-9 lg:col-span-10"
          : "col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12"
      )}
    >
      {children}
    </section>
  );
};

export default DashboardContent;
