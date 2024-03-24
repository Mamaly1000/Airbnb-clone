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
}: {
  data: {
    value: number;
    label: string;
    icon: icontypes;
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
      <div className="min-w-full max-w-full flex items-start justify-between flex-wrap gap-2">
        <Counter
          className="text-2xl capitalize font-bold"
          endValue={data.value}
        />
        <Icon size={style?.icon?.size} color={style?.icon?.color} />
      </div>
      <span className="text-sm capitalize text-neutral-800 dark:text-neutral-300 font-light">
        {data.label}
      </span>
    </motion.article>
  );
};

export default OverviewBox;
