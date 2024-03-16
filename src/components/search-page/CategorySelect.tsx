"use client";
import React from "react"; 
import { twMerge } from "tailwind-merge";
import { categories } from "../categories/Categories";
import { IconType } from "react-icons"; 
import CustomSelect from "../inputs/CustomSelect";
const CategorySelect = ({
  value,
  onChange,
  className,
}: {
  value?: { label: string; icon: IconType; value: number | string };
  className?: string;
  onChange: (val?: typeof value) => void;
}) => {
  return (
    <CustomSelect
      className={className}
      options={categories.map((c) => ({
        label: c.label,
        icon: c.icon,
        value: c.label,
      }))}
      value={value}
      onChange={(newval) => {
        onChange(newval as any);
      }}
      formatOptionLabel={(data) => {
        const Icon = data.icon;
        return (
          <div
            className={twMerge(
              "flex flex-row items-center justify-start px-1 gap-2",
              value?.label === data.label
                ? "text-neutral-600 dark:text-neutral-200 "
                : "text-black dark:text-white"
            )}
          >
            <span
              className={twMerge(
                value?.label === data.label
                  ? "text-neutral-400 dark:text-neutral-300  "
                  : "text-neutral-500 "
              )}
            >
              <Icon size={20} />
            </span>
            {data.label}
          </div>
        );
      }}
      isClearable
      placeholder="select your category..."
    />
  );
};

export default CategorySelect;
