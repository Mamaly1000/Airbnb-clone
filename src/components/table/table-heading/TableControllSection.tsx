"use client";
import CheckBox from "@/components/inputs/CheckBox";
import { isEmpty, isUndefined } from "lodash";
import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import CheckBoxDropDown from "../table-shared-components/CheckBoxDropDown";

export type TableControllSectionPropsType = {
  controllSection: {
    title?: string;
    checkBoxes?: {
      label: string;
      icon?: IconType;
      onClick: () => void;
      isActive?: boolean;
    }[];
    colums_control: {
      label: string;
      icon?: IconType;
      columns?: {
        label: string;
        icon?: IconType;
        onClick: () => void;
        isActive?: boolean;
      }[];
    };
  };
  className?: string;
};

const TableControllSection = ({
  controllSection,
  className,
}: TableControllSectionPropsType) => {
  const { title, checkBoxes, colums_control } = controllSection;
  return (
    <section
      className={twMerge(
        `min-w-full max-w-full flex items-center justify-between gap-2 flex-wrap p-3 z-10 relative`,
        className
      )}
    >
      <div className="w-full md:w-fit flex items-center justify-start z-0 relative">
        {title && (
          <p className="text-sm font-semibold capitalize text-left leading-10 text-black dark:text-white">
            {title}
          </p>
        )}
      </div>
      <div className="w-full md:w-fit flex items-center justify-start lg:justify-end flex-wrap gap-3 relative z-20">
        {!isUndefined(checkBoxes) &&
          !isEmpty(checkBoxes) &&
          checkBoxes?.map((c, i) => (
            <CheckBox
              key={i}
              label={c.label}
              Icon={c.icon}
              onClick={c.onClick}
              index={i}
              isActive={c.isActive}
            />
          ))}
        <CheckBoxDropDown
          label={colums_control.label}
          columns={colums_control.columns}
          icon={colums_control.icon}
        />
      </div>
    </section>
  );
};

export default TableControllSection;
