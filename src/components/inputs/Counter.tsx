"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

const counterOptions = [
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
  {
    label: "3",
    value: 3,
  },
  {
    label: "4",
    value: 4,
  },
  {
    label: "5",
    value: 5,
  },
  {
    label: "6",
    value: 6,
  },
  {
    label: "7",
    value: 7,
  },
  {
    label: "8+",
    value: 10,
  },
];

const Counter = ({
  title,
  subTitle,
  value,
  onChange,
}: {
  title: string;
  subTitle?: string;
  value: number;
  onChange: (value: number) => void;
}) => {
  return (
    <div className="w-full flex flex-col gap-3 items-start justify-start">
      <div className="flex flex-col">
        <div className="font-medium capitalize text-black dark:text-gray-200">
          {title}
        </div>
        {subTitle && (
          <div className="font-light text-gray-600 dark:text-gray-300">
            {subTitle}
          </div>
        )}
      </div>
      <div className="flex flex-row items-center justify-start gap-4 overflow-auto max-w-full min-w-full pb-2">
        {counterOptions.map((d, i) => {
          return (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i / 10 + 0.01, ease: "linear" }}
              key={d.value}
              className={twMerge(
                `px-3 py-2 rounded-lg 
                bg-white dark:bg-neutral-700 text-neutral-500 dark:text-gray-100 
                capitalize border-[1px] 
                border-neutral-500 dark:border-gray-100 
                hover:scale-100 
                 `,
                value === d.value &&
                  "bg-black border-black text-white dark:bg-rose-500 dark:border-rose-500"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onChange(d.value);
              }}
            >
              {d.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default Counter;
