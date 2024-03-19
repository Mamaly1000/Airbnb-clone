"use client";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { LuChevronDown } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { isEmpty } from "lodash";
import CheckBox from "@/components/inputs/CheckBox";

const CheckBoxDropDown = ({
  label,
  columns,
}: {
  label: string;
  icon?: IconType | undefined;
  columns?:
    | {
        label: string;
        icon?: IconType | undefined;
        onClick: () => void;
        isActive?: boolean | undefined;
      }[]
    | undefined;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.section className="max-w-fit max-h-fit relative z-20 flex items-center justify-center">
      <button
        className={twMerge(
          `text-sm capitalize
           flex items-center justify-center gap-2
            px-3 py-2 rounded-[5px] drop-shadow-2xl 
            text-neutral-900 dark:text-neutral-200
            border-[1px] border-neutral-300 dark:border-neutral-600`
        )}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        {label} <LuChevronDown size={13} rotate={open ? 0 : 180} />
      </button>
      <AnimatePresence>
        {open && !isEmpty(columns) && (
          <motion.section
            className={twMerge(
              `min-w-fit max-w-[300px] md:max-w-fit 
               flex items-start justify-start flex-col gap-1 
               p-2 rounded-[5px] drop-shadow-2xl
             bg-white dark:bg-neutral-800
              absolute top-[110%] start-0 md:end-0  `
            )}
            onMouseLeave={() => setOpen(false)}
          >
            {columns?.map((column, index) => (
              <CheckBox
                key={index}
                index={index}
                label={column.label}
                isActive={column.isActive}
                onClick={() => {
                  column.onClick();
                  setOpen(false);
                }}
              />
            ))}
          </motion.section>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default CheckBoxDropDown;
