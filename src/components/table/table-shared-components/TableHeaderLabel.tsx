"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { BiSortUp } from "react-icons/bi";
import { reservationSortTypes } from "@/types/reservationTypes";
import { ReviewSortTypes } from "@/types/ReviewTypes";
export type SingleTable_TH_type = {
  label: string;
  sort:
    | {
        isActive: false;
      }
    | {
        isActive: true;
        type?: "asc" | "desc";
      };
  disabled?: boolean | undefined;
  display?: boolean | undefined;
  onClick?: (() => void) | undefined;
  colunm_type: reservationSortTypes | ReviewSortTypes;
  className?: string;
};

const TableHeaderLabel = ({
  item,
  index,
}: {
  index: number;
  item: SingleTable_TH_type;
}) => {
  return (
    <AnimatePresence>
      {item.display && (
        <motion.th
          className={twMerge(
            `text-[12px] min-w-[150px] relative z-0`,
            item.className
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              item?.onClick!();
            }}
            disabled={item.disabled}
            className="min-w-full max-w-full p-2 text-neutral-700 dark:text-neutral-200 uppercase flex items-center justify-between gap-1"
          >
            {item.label}
            <AnimatePresence>
              {item.sort.isActive && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    rotate: item.sort.type === "asc" ? 0 : 180,
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.12, ease: "linear" }}
                  className="flex items-center justify-center"
                >
                  <BiSortUp size={15} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.th>
      )}
    </AnimatePresence>
  );
};

export default TableHeaderLabel;
