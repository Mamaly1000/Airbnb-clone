"use client";
import React, { useMemo } from "react";
import { IconType } from "react-icons";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import Button from "@/components/inputs/Button";
import { Range } from "react-date-range";
export type tableHeaderPropsType = {
  className?: string;
  headingActions?: {
    create?: {
      label?: string;
      icon?: IconType;
      onClick: (e?: any) => void;
    };
    reset?: {
      label?: string;
      icon?: IconType;
      onClick: (e?: any) => void;
    };
    calendar?: {
      date: Range;
      setDate: () => void;
    };
  };
  heading?: { title?: string; subtitle?: string };
};
const TableHeader = ({
  heading,
  headingActions,
  className,
}: tableHeaderPropsType) => {
  const CreateIcon = useMemo(() => {
    if (headingActions?.create?.icon) {
      const Icon = headingActions.create.icon;
      return <Icon size={20} />;
    }
  }, [headingActions?.create?.icon]);
  const ResetIcon = useMemo(() => {
    if (headingActions?.reset?.icon) {
      const Icon = headingActions.reset.icon;
      return <Icon size={20} />;
    }
  }, [headingActions?.reset?.icon]);
  return (
    <motion.section
      className={twMerge(
        `min-w-full max-w-full flex items-start justify-start gap-2 md:justify-between flex-wrap`,
        className
      )}
    >
      <div className="flex items-start justify-start flex-col md:max-w-[50%] ">
        <h3 className="font-semibold text-[20px] md:text-[35px] text-black dark:text-white capitalize p-0 ">
          {heading?.title || "tables heading title"}
        </h3>
        <p className="text-[12px] md:text-[14px] capitalize text-neutral-800 dark:text-neutral-200">
          {heading?.subtitle || "tables heading subtitle"}
        </p>
      </div>
      <div className="flex flex-wrap items-start justify-start md:justify-end gap-2">
        {headingActions?.calendar && (
          <button
            onClick={headingActions?.calendar.setDate}
            className={twMerge(
              `flex items-center justify-center gap-2 
              border-[1px] rounded-[5px] 
              drop-shadow-2xl
              text-white
              bg-black dark:bg-rose-500 
              border-black dark:border-rose-500  
              overflow-hidden min-h-[40px] max-h-fit px-3 `
            )}
          >
            <motion.span
              className="text-[15px] font-semibold"
              key={
                headingActions.calendar.date.startDate!.toISOString() ||
                headingActions.calendar.date.endDate!.toISOString()
              }
              initial={{ translateY: 20, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: "linear" }}
            >
              {format(headingActions.calendar.date.startDate!, "MMM dd, yyyy")}
              {" - "}
              {format(headingActions.calendar.date.endDate!, "MMM dd, yyyy")}
            </motion.span>
          </button>
        )}
        {headingActions?.create && (
          <Button
            className="w-[40px] h-[40px] bg-green-600 border-green-600"
            onClick={() => headingActions.create?.onClick()}
          >
            {CreateIcon}
          </Button>
        )}
        {headingActions?.reset && (
          <button
            className="w-[40px] h-[40px] bg-red-500 border-red-500 flex items-center justify-center rounded-[5px] drop-shadow-2xl text-white"
            onClick={() => headingActions.reset?.onClick()}
          >
            {ResetIcon}
          </button>
        )}
      </div>
    </motion.section>
  );
};

export default TableHeader;
