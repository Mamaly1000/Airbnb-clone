"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";
import { PiBathtub, PiUsersThreeDuotone } from "react-icons/pi";
import { BsTags } from "react-icons/bs";
import {
  MdOutlineAttachMoney,
  MdOutlineCleanHands,
  MdOutlineFactCheck,
  MdOutlineStarPurple500,
} from "react-icons/md";
import { TbHomeStats } from "react-icons/tb";
import Counter from "@/components/shared/Counter";
export type icontypes =
  | "star"
  | "clean"
  | "user"
  | "dollar"
  | "home"
  | "bath"
  | "calendar"
  | "calendar"
  | "dollar"
  | "check-circle";
const icons: {
  icon: IconType;
  type: icontypes;
}[] = [
  {
    icon: PiBathtub,
    type: "bath",
  },
  {
    icon: BsTags,
    type: "calendar",
  },
  {
    icon: MdOutlineFactCheck,
    type: "check-circle",
  },
  {
    icon: MdOutlineCleanHands,
    type: "clean",
  },
  {
    icon: MdOutlineAttachMoney,
    type: "dollar",
  },
  {
    icon: TbHomeStats,
    type: "home",
  },
  {
    icon: MdOutlineStarPurple500,
    type: "star",
  },
  {
    icon: PiUsersThreeDuotone,
    type: "user",
  },
];
const OverviewBox = ({
  delay,
  style,
  className,
  data,
  progress,
}: {
  progress?: {
    minWidth: string | number;
    percentage: number;
    color?: string;
  };
  data: {
    value: number;
    label: string;
    icon: icontypes;
    isMoney?: boolean;
  };
  style?: {
    background?: {
      dark?: string;
      light?: string;
    };
    icon?: {
      color?: string;
      size?: number | string;
    };
  };
  delay?: number;
  className?: string;
}) => {
  const Icon: IconType = useMemo(() => {
    if (!data.icon) {
      return MdOutlineAttachMoney;
    }
    return icons.find((i) => i.type === data.icon)?.icon!;
  }, [data.icon]);
  return (
    <motion.article
      transition={{ duration: 0.1, delay }}
      initial={{ opacity: 0, translateX: -10 }}
      animate={{
        opacity: 1,
        translateX: 0,
      }}
      className={twMerge(
        `border-[1px] border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-900
        flex flex-col items-start justify-start gap-2 p-5 rounded-[5px] drop-shadow-2xl`,
        className
      )}
    >
      <div className="min-w-full max-w-full flex items-start justify-between flex-row gap-2">
        <Counter
          className="text-2xl capitalize font-bold"
          endValue={data.value}
          decimal={data.isMoney ? "." : ""}
          decimals={data.isMoney ? 2 : 0}
          prefix={data.isMoney ? "$" : undefined}
        />
        <Icon size={style?.icon?.size} color={style?.icon?.color} />
      </div>
      <span className="text-sm capitalize text-neutral-800 dark:text-neutral-300 font-light">
        {data.label}
      </span>
      {progress && (
        <div className="min-w-full max-w-full flex items-center justify-between gap-2 py-2">
          <div className="min-h-[5px] min-w-[75%] max-w-[75%] rounded-full drop-shadow-2xl bg-neutral-500 flex items-center justify-start p-0 m-0">
            <motion.div
              transition={{
                duration: 1,
                delay: delay ? delay + 1 : 2,
                ease: "easeInOut",
              }}
              initial={{ minWidth: "3%" }}
              animate={{
                minWidth: progress.minWidth,
                background: progress.color
                  ? progress.color
                  : "rgb(244 63 94 / var(--tw-bg-opacity))",
              }}
              className={twMerge("min-h-[5px] rounded-full")}
            ></motion.div>
          </div>
          <Counter
            className="min-w-[20%] max-w-[20%] text-sm text-neutral-700 dark:text-neutral-300 text-end"
            endValue={progress.percentage}
            decimal=""
            decimals={0}
            suffix="%"
            delay={2}
            duration={1}
          />
        </div>
      )}
    </motion.article>
  );
};

export default OverviewBox;
