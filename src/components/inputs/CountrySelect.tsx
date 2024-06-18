"use client";
import useCountry, { SingleCountryType } from "@/hooks/useCountry";
import { useTheme } from "next-themes";
import React from "react";
import Select from "react-select";
import { twMerge } from "tailwind-merge";

const CountrySelect = ({
  onChange,
  value,
  className,
}: {
  className?: string;
  value?: SingleCountryType;
  onChange: (value: SingleCountryType) => void;
}) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const { getAll } = useCountry();
  return (
    <div className={twMerge("", className)}>
      <Select
        placeholder="AnyWhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(newval) => {
          onChange(newval as SingleCountryType);
        }}
        formatOptionLabel={(data) => {
          return (
            <div
              className={twMerge(
                "flex flex-row px-1  ",
                value?.label === data.label
                  ? "text-neutral-600 dark:text-neutral-200 "
                  : "text-black dark:text-white"
              )}
            >
              {data.label},{" "}
              <span
                className={twMerge(
                  "ml-1",
                  value?.label === data.label
                    ? "text-neutral-400 dark:text-neutral-300  "
                    : "text-neutral-500   "
                )}
              >
                {data.region}
              </span>
            </div>
          );
        }}
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
            primary: isDarkMode ? "rgba(244 63 94/.5)" : "rgba(0 0 0/.2)",
            primary25: isDarkMode ? "rgba(244 63 94 / .2)" : "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
