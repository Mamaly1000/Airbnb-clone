"use client";
import React, { useState } from "react";
import Select from "react-select";
import { twMerge } from "tailwind-merge";
import { categories } from "../categories/Categories";
import { IconType } from "react-icons";
import { FcEmptyFilter } from "react-icons/fc";
import { useTheme } from "@/hooks/useTheme";
const CategorySelect = ({
  value,
  onChange,
  className,
}: {
  value: { label: string; icon: IconType } | undefined;
  className?: string;
  onChange: (val?: typeof value) => void;
}) => {
  const { mode } = useTheme();

  return (
    <div className={twMerge("  ", className)}>
      <Select
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
        classNames={{
          control: () =>
            "p-3 border-2 border-neutral-400 focus:border-neutral-400 bg-white dark:bg-neutral-800 text-black dark:text-white",
          input: () => "text-lg text-black dark:text-white",
          option: () => "text-lg text-red-900 bg-black",
          menuList: () =>
            twMerge(
              "bg-white dark:bg-neutral-800 text-black dark:text-white rounded-lg drop-shadow-2xl border-[1px] border-neutral-300 dark:border-rose-500"
            ),
          menu: () =>
            twMerge(
              "bg-white dark:bg-neutral-800 text-black dark:text-white rounded-lg drop-shadow-2xl border-[1px] border-neutral-300 dark:border-rose-500"
            ),
          valueContainer: () => " bg-white dark:bg-neutral-800 text-black ",
          multiValueLabel: () =>
            "bg-white dark:bg-neutral-800 text-black dark:text-white",
          placeholder: () => "text-neutral-400",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary: mode === "dark" ? "rgba(244 63 94/.5)" : "rgba(0 0 0/.2)",
            primary25: mode === "dark" ? "rgba(244 63 94 / .2)" : "#ffe4e6",
          },
        })}
        placeholder="select your category..."
      />
    </div>
  );
};

export default CategorySelect;
