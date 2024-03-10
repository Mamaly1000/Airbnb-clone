"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const MenuItem = ({
  label,
  onClick,
  Icon,
  index,
}: {
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
      className="flex items-center justify-between gap-2 px-4 py-3 hover:bg-neutral-100 transition font-semibold min-w-fit whitespace-nowrap"
      onClick={onClick}
    >
      {label}{" "}
      {Icon && typeof Icon === "string" ? (
        <Image src={Icon} alt={label} width={25} height={25} />
      ) : (
        Icon
      )}
    </motion.button>
  );
};

export default MenuItem;
