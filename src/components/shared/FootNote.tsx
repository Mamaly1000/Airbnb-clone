"use client";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { VscWarning } from "react-icons/vsc";
import { useTheme } from "next-themes";

export type FootNotePropsType = {
  className?: string;
  ul?: boolean;
  notes?: {
    onClick?: () => void;
    color?: {
      dark?: string;
      light?: string;
    };
    note: string;
  }[];
};

const FootNote = ({ notes, ul, className }: FootNotePropsType) => {
  const { resolvedTheme } = useTheme();
  const cls = twMerge(
    "min-w-full max-w-full flex flex-col items-start justify-start gap-1 p-2 capitalize",
    className
  );
  const items = useMemo(() => {
    if (!notes) return [];
    return notes.map((n, i) => (
      <motion.li
        animate={{
          color: resolvedTheme === "dark" ? n.color?.dark : n?.color?.light,
        }}
        className="min-w-full flex items-start justify-start gap-3 max-w-full px-2 text-neutral-900 dark:text-neutral-200 text-sm font-light"
        key={i}
        onClick={n.onClick}
      >
        <VscWarning size={15} /> {n.note}
      </motion.li>
    ));
  }, [notes, resolvedTheme]);
  return ul ? (
    <ul className={cls}>{items}</ul>
  ) : (
    <ol className={cls}>{items}</ol>
  );
};

export default FootNote;
