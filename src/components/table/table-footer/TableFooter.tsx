"use client";
import DropDown from "@/components/ui/Dropdown";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export type TableFooterPropsType = {
  footerItemOnclick?: (page: number) => void;
  isLoading?: boolean;
  className?: string;
  pagination?: {
    hasMore: boolean;
    totalPages: number;
    total: number;
    currentPage: number;
    nextPage: number;
  };
};

const TableFooter = ({
  pagination,
  className,
  isLoading,
  footerItemOnclick,
}: TableFooterPropsType) => {
  const [open, setOpen] = useState(false);
  return (
    <section
      className={twMerge(
        `min-w-full max-w-full py-2 px-3 rounded-b-lg  
        flex items-center justify-start gap-2
        text-neutral-700 dark:text-neutral-200
        bg-neutral-300 dark:bg-neutral-900
        `,
        className
      )}
    >
      <DropDown
        onDropDown={() => {
          setOpen(!open);
        }}
        buttonClassName="min-w-fit w-fit h-fit min-h-fit max-w-fit max-h-fit px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-black dark:hover:bg-rose-500 bg-black font-normal text-white  hover:text-white dark:hover:text-white dark:bg-rose-500"
        display={open}
        isLoading={isLoading}
        onClose={() => {
          setOpen(false);
        }}
        options={Array.from(
          { length: pagination?.totalPages || 1 },
          (_, i) => ({
            value: i + 1,
            label: `Page ${i + 1}`,
            onClick: () => {
              footerItemOnclick!(i + 1);
              setOpen(false);
            },
            disabled: isLoading,
          })
        )}
        position="bottom-0"
      >
        <p className="text-sm text-left capitalize font-semibold min-w-fit flex items-center justify-center whitespace-nowrap">
          page {pagination?.currentPage || 1}
        </p>
      </DropDown>
    </section>
  );
};

export default TableFooter;
