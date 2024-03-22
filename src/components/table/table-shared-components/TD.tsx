"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const TD = ({
  children,
  display = true,
  className,
  index,
  isSorting,
}: {
  isSorting?: boolean;
  index: number;
  children?: ReactNode;
  display?: boolean;
  className?: string;
}) => {
  return (
    <AnimatePresence>
      {!display && (
        <motion.td
          className={twMerge(
            `text-[13px] text-neutral-900 dark:text-neutral-100 min-w-[150px] line-clamp-1 max-w-[150px] p-2 relative z-0`,
            isSorting && "text-rose-500 dark:text-red-300",
            className
          )}
          initial={{ opacity: 0, translateX: 10 }}
          exit={{
            opacity: 0,
            transition: {
              delay: 0,
              duration: 0.1,
            },
          }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{
            duration: 0.12,
            ease: "linear",
            delay: index / 10 + 0.01,
          }}
        >
          {children}
        </motion.td>
      )}
    </AnimatePresence>
  );
};

export default TD;
