"use client";
import React, { useMemo } from "react";
import { IconType } from "react-icons";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { format, isSameDay } from "date-fns";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Button from "@/components/inputs/Button";
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
      date: Date;
      setDate: (date: Date) => void;
    };
  };
  heading?: { title?: string; subtitle?: string };
};
const TableHeader = ({ heading, headingActions, className }: tableHeaderPropsType) => {
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
        `min-w-full max-w-full flex items-center justify-start gap-2 md:justify-between flex-wrap`,
        className
      )}
    >
      <div className="flex items-start justify-start flex-col md:max-w-[50%] ">
        <h3 className="font-semibold text-[20px] md:text-[35px] text-black dark:text-white capitalize">
          {heading?.title || "tables heading title"}
        </h3>
        <p className="text-[12px] md:text-[14px] capitalize font-light text-neutral-600 dark:text-neutral-200">
          {heading?.subtitle || "tables heading subtitle"}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-start md:justify-end gap-2">
        {headingActions?.calendar && (
          <button className="flex items-center justify-center gap-2 border-[1px] rounded-[5px] drop-shadow-2xl border-black dark:border-neutral-600 overflow-hidden">
            <span className="w-[40px] h-[40px] bg-black dark:bg-neutral-600 text-white flex items-center justify-center">
              <MdKeyboardArrowLeft size={20} />
            </span>
            <motion.span
              className="text-neutral-500 dark:text-neutral-100 text-[15px] font-semibold"
              key={headingActions.calendar.date.toISOString()}
            >
              {format(headingActions.calendar.date, "MMM dd, yyyy")}
              {!!isSameDay(headingActions.calendar.date, Date.now()) && " Today"}
            </motion.span>
            <span className="w-[40px] h-[40px] bg-black dark:bg-neutral-600 text-white flex items-center justify-center">
              <MdKeyboardArrowRight size={20} />
            </span>
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
          <Button
            className="w-[40px] h-[40px] bg-red-600 border-red-600"
            onClick={() => headingActions.reset?.onClick()}
          >
            {ResetIcon}
          </Button>
        )}
      </div>
    </motion.section>
  );
};

export default TableHeader;
