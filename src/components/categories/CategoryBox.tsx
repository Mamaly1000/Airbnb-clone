"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { Tooltip } from "react-tooltip";
const CategoryBox = ({
  category,
  onClick,
  className,
}: {
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
  }, [category.label, params, router, onClick]);
  return (
    <div
      id={category.label}
      onClick={() => {
        handleClick();
      }}
      className={twMerge(
        ` flex flex-col items-center justify-center gap-2 border-b-2 p-3 hover:text-neutral-800 transition cursor-pointer `,
        className
      )}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{category.label}</div>
    </div>
  );
};

export default CategoryBox;
