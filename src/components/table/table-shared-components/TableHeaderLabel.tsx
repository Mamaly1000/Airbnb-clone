"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const TableHeaderLabel = ({
  item,
  index,
}: {
  index: number;
  item: {
    label: string;
    sort: {
      isActive?: boolean;
      type?: "asc" | "desc";
    };
    disabled?: boolean | undefined;
    display?: boolean | undefined;
    onClick?: (() => void) | undefined;
  };
}) => {
  return (
    <AnimatePresence>
      {item.display && (
        <motion.th
          className={twMerge(``)}
          initial={{ opacity: 0, translateX: 10 }}
          exit={{ opacity: 0, translateX: 10 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{
            duration: 0.12,
            ease: "linear",
            delay: index / 10 + 0.01,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              item?.onClick!();
            }}
            disabled={item.disabled}
            className="p-2 text-neutral-700 dark:text-neutral-200 uppercase"
          >
            {item.label}
          </button>
        </motion.th>
      )}
    </AnimatePresence>
  );
};

export default TableHeaderLabel;
