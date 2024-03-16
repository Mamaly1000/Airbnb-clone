import React from "react";
import { IconType } from "react-icons";
import { GiSpiderWeb } from "react-icons/gi"; 
import { IoMdTrendingUp } from "react-icons/io";
import { MdTrendingDown, MdWhatshot } from "react-icons/md";
import CustomSelect from "../inputs/CustomSelect"; 

export type listingSortType = "NEWEST" | "OLDEST" | "TOP PRICE" | "LOWER PRICE";

const sortsItems: {
  type: listingSortType;
  label: string;
  icon: IconType;
}[] = [
  { type: "LOWER PRICE", label: "lowest price", icon: MdTrendingDown },
  { type: "TOP PRICE", label: "top price", icon: IoMdTrendingUp },
  { type: "NEWEST", label: "newest", icon: MdWhatshot },
  { type: "OLDEST", label: "oldest", icon: GiSpiderWeb },
];

const SortSelect = ({
  value,
  onChange,
}: {
  value?: {
    type: listingSortType;
    label: string;
    icon: IconType;
  };
  onChange: (val: typeof value) => void;
}) => {
  return (
    <CustomSelect
      value={
        value
          ? {
              icon: value?.icon,
              label: value?.label,
              value: value?.type,
            }
          : undefined
      }
      onChange={(newVal) =>
        onChange(
          !!newVal
            ? {
                icon: newVal?.icon,
                label: newVal?.label,
                type: newVal?.value as listingSortType,
              }
            : undefined
        )
      }
      options={sortsItems.map((item) => ({
        icon: item.icon,
        label: item.label,
        value: item.type,
      }))}
      className="min-w-full md:min-w-[300px]"
      formatOptionLabel={(data) => {
        const Icon = data.icon;
        return (
          <div className="min-w-full max-w-full flex items-center justify-start gap-2 text-neutral-400 dark:text-neutral-300">
            <Icon size={20} />
            {data.label}
          </div>
        );
      }}
      isClearable
      placeholder="sort listings..."
    />
  );
};

export default SortSelect;
