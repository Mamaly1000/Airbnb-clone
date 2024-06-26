"use client";
import React from "react";
import { IconType } from "react-icons";
import { ActionMeta, FormatOptionLabelMeta, SingleValue } from "react-select";
import { twMerge } from "tailwind-merge";
import Select from "react-select";
import { useTheme } from "next-themes";

interface props {
  formatOptionLabel?: (
    data: {
      label: string;
      value: string | number;
      icon: IconType;
    },
    formatOptionLabelMeta: FormatOptionLabelMeta<{
      label: string;
      value: string | number;
      icon: IconType;
    }>
  ) => React.ReactNode;
  isClearable?: boolean;
  options: {
    label: string;
    value: string | number;
    icon: IconType;
  }[];
  placeholder?: string;
  className?: string;
  value:
    | {
        label: string;
        value: string | number;
        icon: IconType;
      }
    | undefined;
  onChange:
    | ((
        newValue: SingleValue<{
          label: string;
          value: string | number;
          icon: IconType;
        }>,
        actionMeta: ActionMeta<{
          label: string;
          value: string | number;
          icon: IconType;
        }>
      ) => void)
    | undefined;
  disabled?: boolean;
}

const CustomSelect = ({
  onChange,
  value,
  className,
  placeholder,
  isClearable,
  options,
  formatOptionLabel = (data) => {
    return (
      <div className="min-w-full max-w-full flex items-center justify-start gap-2 capitalize">
        <span
          className={twMerge(
            "text-sm max-w-full min-w-full  line-clamp-1 whitespace-nowrap overflow-x-hidden text-left",
            "text-black dark:text-white"
          )}
        >
          {data.label}
        </span>
      </div>
    );
  },
  disabled,
}: props) => {
  
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <div className={twMerge("", className)}>
      <Select
        isDisabled={disabled}
        placeholder={placeholder}
        isClearable={isClearable}
        options={options}
        value={value}
        onChange={onChange}
        formatOptionLabel={formatOptionLabel}
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

export default CustomSelect;
