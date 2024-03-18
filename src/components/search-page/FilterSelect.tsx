"use client";
import React from "react";
import { IconType } from "react-icons";
import { GrFavorite } from "react-icons/gr";
import CustomSelect from "../inputs/CustomSelect";
import { PiBuildingsBold } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai";
import { usePathname } from "next/navigation";

export type listingFilterType = "FAVORITES" | "ALL" | "MY PROPERTIES";

const filterItems: {
  type: listingFilterType;
  label: string;
  icon: IconType;
}[] = [
  { type: "FAVORITES", label: "favorites", icon: GrFavorite },
  { type: "ALL", label: "All properties", icon: PiBuildingsBold },
  { type: "MY PROPERTIES", label: "my properties", icon: AiOutlineHome },
];
const filterItemsUser: {
  type: listingFilterType;
  label: string;
  icon: IconType;
}[] = [{ type: "FAVORITES", label: "favorites", icon: GrFavorite }];
const FilterSelect = ({
  value,
  onChange,
}: {
  value?: {
    type: listingFilterType;
    label: string;
    icon: IconType;
  };
  onChange: (val: typeof value) => void;
}) => {
  const pathname = usePathname();
  const options =
    pathname && pathname.includes("/mydashboard/properties")
      ? filterItemsUser
      : filterItems;
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
                type: newVal?.value as listingFilterType,
              }
            : undefined
        )
      }
      options={options.map((item) => ({
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
      placeholder="filter listings..."
    />
  );
};

export default FilterSelect;
