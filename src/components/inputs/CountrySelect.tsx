"use client";
import useCountry, { SingleCountryType } from "@/hooks/useCountry";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import Select from "react-select";
import { twMerge } from "tailwind-merge";

const CountrySelect = ({
  onChange,
  value,
}: {
  value?: SingleCountryType;
  onChange: (value: SingleCountryType) => void;
}) => {
  const { mode } = useTheme();
  const { getAll } = useCountry();
  return (
    <div>
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
            <div className="flex flex-row px-1 text-black dark:text-white">
              {data.label},{" "}
              <span className="text-neutral-500 dark:text-neutral-300 ml-1">
                {data.region}
              </span>
            </div>
          );
        }}
        classNames={{
          control: () =>
            "p-3 border-2 border-neutral-400 dark:border-rose-500 bg-white dark:bg-neutral-800 text-black dark:text-white",
          input: () => "text-lg text-black dark:text-white",
          option: () => "text-lg text-red-900",
          menuList: () =>
            twMerge(
              "bg-white dark:bg-neutral-800 text-black dark:text-white rounded-lg drop-shadow-2xl border-[1px] border-neutral-300 dark:border-rose-500"
            ),
          menu: () =>
            twMerge(
              "bg-white dark:bg-neutral-800 text-black dark:text-white rounded-lg drop-shadow-2xl border-[1px] border-neutral-300 dark:border-rose-500"
            ),
          valueContainer: () =>
            " bg-white dark:bg-neutral-800 text-black dark:text-white",
          multiValueLabel: () =>
            "bg-white dark:bg-neutral-800 text-black dark:text-white",
          placeholder: () => "text-neutral-400",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: mode === "dark" ? "rgb(244 63 94 / .2)" : "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
