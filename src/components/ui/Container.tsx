import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Container = ({
  children,
  classname,
  main,
}: {
  main?: boolean;
  classname?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={twMerge(
        `max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-5
         bg-white text-black dark:bg-neutral-800
          dark:text-[#e7e9ea]`,
        main && "min-h-screen",
        classname
      )}
    >
      {children}
    </div>
  );
};

export default Container;
