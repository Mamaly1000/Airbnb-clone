import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useTheme } from "@/hooks/useTheme";
import { IconType } from "react-icons";

const OverviewBox = ({
  delay,
  style,
  className,
  data,
}: {
  data: {
    value: number;
    label: string;
    icon: IconType;
  };
  style?: {
    background?: {
      dark?: string;
      light?: string;
    };
    iconSize?: number;
  };
  delay?: number;
  className?: string;
}) => {
  const { mode } = useTheme();
  return (
    <motion.article
      transition={{ duration: 0.1, delay }}
      initial={{ opacity: 0, translateX: -10 }}
      animate={{
        opacity: 1,
        translateX: 0,
        backgroundColor:
          mode === "dark" ? style?.background?.dark : style?.background?.light,
      }}
      className={twMerge(
        `border-[1px] border-neutral-100 dark:border-neutral-900 bg-white dark:bg-neutral-800
        flex flex-col items-start justify-start gap-2 p-3 rounded-[5px] drop-shadow-2xl`,
        className
      )}
    >
      <div className="min-w-full max-w-full flex items-center justify-between flex-wrap gap-2">
        <span className="text-2xl capitalize font-bold">
          {data.value.toFixed(2)}
        </span>
      </div>
    </motion.article>
  );
};

export default OverviewBox;
