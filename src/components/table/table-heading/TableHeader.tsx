"use client";
import React, { useMemo } from "react";
import { IconType } from "react-icons";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { format, isSameDay } from "date-fns";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Button from "@/components/inputs/Button";

const TableHeader = ({
  heading,
  actions,
  className,
}: {
  className?: string;
  actions?: {
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
}) => {
  const CreateIcon = useMemo(() => {
    if (actions?.create?.icon) {
      const Icon = actions.create.icon;
      return <Icon size={20} />;
    }
  }, [actions?.create?.icon]);
  const ResetIcon = useMemo(() => {
    if (actions?.reset?.icon) {
      const Icon = actions.reset.icon;
      return <Icon size={20} />;
    }
  }, [actions?.reset?.icon]);
  return (
    <motion.section
      className={twMerge(
        `min-w-full max-w-full flex items-center justify-start gap-2 md:justify-between flex-wrap`,
        className
      )}
    >
      <div className="flex items-start justify-start">
        <h3 className="font-semibold text-[13px] md:text-[16px] text-black dark:text-white capitalize">
          {heading?.title || "tables heading title"}
        </h3>
        <p className="text-[12px] md:text-[14px] capitalize font-light text-neutral-600 dark:text-neutral-200">
          {heading?.subtitle || "tables heading subtitle"}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-start md:justify-end gap-2">
        {actions?.calendar && (
          <div className="flex items-center justify-center gap-1">
            <button className="w-[30px] h-[30px] rounded-full drop-shadow-2xl flex items-center justify-center border-[1px] border-black dark:border-rose-500 text-black dark:text-rose-500">
              <MdKeyboardArrowLeft size={13} />
            </button>
            <motion.span
              className="text-black dark:text-white"
              key={actions.calendar.date.toISOString()}
            >
              {format(actions.calendar.date, "MMM dd, yyyy")}
              {!!isSameDay(actions.calendar.date, Date.now()) && "Today"}
            </motion.span>
            <button className="w-[30px] h-[30px] rounded-full drop-shadow-2xl flex items-center justify-center border-[1px] border-black dark:border-rose-500 text-black dark:text-rose-500">
              <MdKeyboardArrowRight size={13} />
            </button>
          </div>
        )}
        {actions?.create && (
          <Button onClick={() => actions.create?.onClick()}>
            {CreateIcon} {actions.create?.label}
          </Button>
        )}{" "}
        {actions?.reset && (
          <Button onClick={() => actions.reset?.onClick()}>
            {ResetIcon} {actions.reset?.label}
          </Button>
        )}
      </div>
    </motion.section>
  );
};

export default TableHeader;
