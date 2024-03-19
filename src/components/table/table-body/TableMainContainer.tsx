"use client";
import React from "react";
import { motion } from "framer-motion";
import TableHead, { TableHeaderTypes } from "./TableHead";
import TableBody from "./TableBody";
import { twMerge } from "tailwind-merge";

const TableMainContainer = ({
  className,
  tableHeaderLabels,
}: {
  className?: string;
} & TableHeaderTypes) => {
  return (
    <motion.table
      className={twMerge(
        `min-w-full max-w-full
         flex flex-col items-start justify-start 
         rounded-[5px] p-3 relative z-0`,
        className
      )}
    >
      <TableHead tableHeaderLabels={tableHeaderLabels} />
      <TableBody />
    </motion.table>
  );
};

export default TableMainContainer;
