"use client";
import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

const CheckBox = ({
  label,
  onClick,
  index,
  isActive,
}: {
  label: string;
  Icon?: IconType;
  onClick: () => void;
  index: number;
  isActive?: boolean;
}) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, translateX: -10 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: -10 }}
      transition={{ duration: 0.13, delay: index / 10 + 0.01, ease: "linear" }}
      className={twMerge(
        "max-w-fit rounded-lg flex items-center justify-center gap-2"
      )}
    >
      <div className="min-w-[25px] min-h-[25px] max-w-[25px] max-h-[25px] flex items-center justify-center rounded-[5px] drop-shadow-2xl bg-transparent border-[1px] border-rose-500  overflow-hidden">
        <AnimatePresence>
          {isActive && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "linear" }}
              className="w-[25px] text-white h-[25px] bg-rose-500 flex p-1 items-center justify-center"
            >
              <FaCheck size={12} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <p className="text-sm capitalize text-neutral-900 dark:text-neutral-200 whitespace-nowrap">
        {label}
      </p>
    </motion.button>
  );
};

export default CheckBox;
