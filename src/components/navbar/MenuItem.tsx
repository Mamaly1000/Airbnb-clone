"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const MenuItem = ({
  label,
  onClick,
  Icon,
  index,
  mobileOnly,
}: {
  mobileOnly?: boolean;
  index?: number;
  Icon?: any;
  label: string;
  onClick: () => void;
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, translateX: 10 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ delay: (index || 0) / 10 + 0.01, ease: "linear" }}
      className={twMerge(
        `flex items-center justify-between gap-2 px-4 py-3
       hover:bg-neutral-100 dark:hover:bg-rose-500
        font-semibold min-w-fit whitespace-nowrap`,
        mobileOnly && "md:hidden"
      )}
      onClick={onClick}
    >
      {label}
      {Icon && <Icon size={15} />}
    </motion.button>
  );
};

export default MenuItem;
