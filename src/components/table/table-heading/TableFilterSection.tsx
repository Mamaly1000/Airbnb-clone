"use client";
import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import { TbFilterCancel } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";

export type tableFilterOption = {
  label: string;
  value: any;
  icon: IconType;
};
export type TableFilterSectionPropsType = {
  className?: string;
  tableFilterOptions?: tableFilterOption[];
  TableDefaultFilterOptions?: tableFilterOption[];
  onSelectTableFilter?: (option: tableFilterOption) => void;
  onResetTableFilter?: () => void;
  onDeselectTableFilter?: (item: tableFilterOption) => void;
  filterButton: {
    label: string;
    icon: IconType;
    onClick: () => void;
  };
};
const TableFilterSection = ({
  tableFilterOptions = [],
  onResetTableFilter,
  className,
  onDeselectTableFilter,
  filterButton,
}: TableFilterSectionPropsType) => {
  return (
    <section
      className={twMerge(
        `min-w-full max-w-full flex flex-col items-start justify-start gap-2 flex-wrap`,
        className
      )}
    >
      <section className="min-w-full max-w-full flex items-center justify-start gap-2 relative p-3 border-b-[1px] border-neutral-300 dark:border-neutral-600 z-20">
        {filterButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              filterButton.onClick();
            }}
            className={twMerge(
              `px-3 rounded-[5px] drop-shadow-2xl 
          flex items-center justify-center gap-1 
          text-sm capitalize h-[40px] relative z-10
          border-[1px] border-black dark:border-neutral-600
          disabled:cursor-not-allowed disabled:opacity-50`
            )}
          >
            {filterButton.icon && <filterButton.icon size={20} />}{" "}
            {filterButton.label}
          </button>
        )}
        <button
          className={twMerge(
            `text-sm h-[40px] max-w-fit px-2 bg-transparent 
             dark:text-red-400 dark:border-red-400  
             text-red-600 border-red-600
             active:scale-90 flex items-center justify-center gap-1 
             border-[1px] rounded-[5px] 
             drop-shadow-2xl capitalize`
          )}
          onClick={onResetTableFilter}
        >
          <TbFilterCancel size={20} /> reset filters
        </button>
      </section>
      <section className=" flex flex-wrap items-center justify-between md:justify-start gap-2 min-w-full max-w-full">
        {tableFilterOptions.map(({ icon: Icon, label, value }, i) => (
          <button
            key={i}
            className={twMerge(
              `w-full sm:w-[45%] md:w-fit
              bg-neutral-500 dark:bg-neutral-900 bg-opacity-10 
              rounded-full px-2 py-1 
              text-black dark:text-white text-[10px] sm:text-[12px] md:text-[14px] capitalize cursor-pointer
               hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white
                flex items-center justify-between gap-2 active:scale-90 hover:scale-100`
            )}
            onClick={(e) => {
              e.stopPropagation();
              onDeselectTableFilter!({ icon: Icon, label, value });
            }}
          >
            <Icon size={"15px"} />
            {label}
            <RxCross2 size={"15px"} />
          </button>
        ))}
      </section>
    </section>
  );
};

export default TableFilterSection;
