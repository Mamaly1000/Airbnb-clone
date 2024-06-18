"use client";
import useScrollAnimation from "@/hooks/useScroll";
import { safeUserType } from "@/types/safeuser";

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const NavbarWrapper = ({
  children,
  className,
}: {
  user?: safeUserType | null;
  className?: string;
  children: ReactNode;
}) => {
  const { scrolled, isScrolling } = useScrollAnimation({});

  return (
    <div
      className={twMerge(
        `fixed top-0 left-0 min-w-full max-w-full min-h-[50px] z-10 bg-white 
          dark:bg-neutral-800 shadow-md shadow-gray-200 dark:shadow-gray-900 `,
        className,
        scrolled && isScrolling && "translate-y-[-70px]"
      )}
    >
      {children}
    </div>
  );
};
export default NavbarWrapper;
