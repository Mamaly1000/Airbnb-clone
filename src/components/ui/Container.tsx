"use client";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Container = ({
  children,
  classname,
}: {
  classname?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={twMerge(
        `max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 `,
        classname
      )}
    >
      {children}
    </div>
  );
};

export default Container;
