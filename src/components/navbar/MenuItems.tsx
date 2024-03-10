"use client";
import React, { Fragment } from "react";
import MenuItem from "./MenuItem";
import { IconType } from "react-icons";

const MenuItems = ({
  items = [],
  onClose,
}: {
  onClose?: () => void;
  items?: {
    id: number;
    label: string;
    Icon?: IconType | string;
    onClick: () => void;
    hr?: boolean;
    mobileOnly?: boolean;
  }[];
}) => {
  return (
    <>
      {items?.map((item, i) => {
        return (
          <Fragment key={item.id}>
            <MenuItem
              index={i}
              label={item.label}
              onClick={() => {
                item.onClick();
                onClose!();
              }}
              mobileOnly={item.mobileOnly}
              Icon={item.Icon}
            />
            {item.hr && <hr />}
          </Fragment>
        );
      })}
    </>
  );
};

export default MenuItems;
