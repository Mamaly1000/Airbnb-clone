"use client";
import React from "react";
import { motion } from "framer-motion";
import TableHead, { TableHeaderTypes } from "./TableHead";
import TableBody, { TableBodyPropsType } from "./TableBody";
import { twMerge } from "tailwind-merge";
import Loader from "@/components/ui/Loader";

const TableMainContainer = ({
  className,
  tableHeaderLabels,
  tableBody,
}: {
  className?: string;
  tableBody: TableBodyPropsType;
} & TableHeaderTypes) => {
  return (
    <motion.table
      className={twMerge(
        `min-w-full max-w-full overflow-auto 
         flex flex-col items-start justify-start 
         rounded-[5px] p-3 relative z-0 max-h-[400px] min-h-[400px]`,
        className
      )}
    >
      <TableHead tableHeaderLabels={tableHeaderLabels} />
      {!tableBody.isLoading ? (
        <TableBody RowElement={tableBody.RowElement} rows={tableBody?.rows} />
      ) : (
        <tbody className="min-w-full max-w-full flex items-start justify-start">
          <tr className="min-w-full max-w-full flex items-center justify-center">
            <td>
              <Loader
                className="min-w-full max-w-full flex items-center justify-center  min-h-[300px]"
                size={30}
              />
            </td>
          </tr>
        </tbody>
      )}
    </motion.table>
  );
};

export default TableMainContainer;
