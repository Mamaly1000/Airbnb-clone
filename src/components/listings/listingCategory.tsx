"use client";
import React from "react";
import { IconType } from "react-icons";

const ListingCategory = ({
  category,
}: {
  category?: {
    label: string;
    icon: IconType;
    description: string;
  };
}) => {
  const { icon: Icon } = category!;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600 dark:text-neutral-500" />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{category?.label}</div>
          <div className="text-neutral-500 font-light dark:text-neutral-400">
            {category?.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
