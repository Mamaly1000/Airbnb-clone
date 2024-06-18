"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
const CategoryBox = ({
  category,
  onClick,
  className,
  displayLabel = true,
}: {
  displayLabel?: boolean;
  className?: string;
  onClick?: (category: {
    label: string;
    icon: IconType;
    description: string;
  }) => void;
  category: {
    label: string;
    icon: IconType;
    description: string;
  };
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const { icon: Icon } = category;

  const handleClick = useCallback(() => {
    if (!!!onClick) {
      let currentQuery = {};
      if (params) {
        currentQuery = qs.parse(params.toString());
      }
      const updatedQuery: any = {
        ...currentQuery,
        category: category.label,
      };
      if (params?.get("category") === category.label) {
        delete updatedQuery.category;
      }
      let url = qs.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        { skipNull: true }
      );
      router.push(url);
    } else {
      onClick(category);
    }
  }, [params, router, onClick, category]);

  return (
    <button
      id={category.label}
      onClick={() => {
        handleClick();
      }}
      className={twMerge(
        ` flex flex-col items-center justify-center gap-2 
        border-b-2 p-3 hover:text-neutral-800 transition cursor-pointer 
        bg-white dark:bg-neutral-800 text-neutral-400
        `,
        className
      )}
    >
      <Icon size={26} />
      {displayLabel && <p className="font-medium text-sm">{category.label}</p>}
    </button>
  );
};

export default CategoryBox;
