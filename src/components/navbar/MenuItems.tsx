import React from "react";
import MenuItem from "./MenuItem";
import { IconType } from "react-icons";

const MenuItems = ({
  items = [],
}: {
  items?: {
    label: string;
    Icon?: IconType | string;
    onClick: () => void;
    hr?: boolean;
  }[];
}) => {
  return (
    <>
      {items?.map((item) => {
        return (
          <>
            <MenuItem
              key={item.label + item.onClick.toString()}
              label={item.label}
              onClick={item.onClick}
              Icon={item.Icon}
            />
            {item.hr && <hr />}
          </>
        );
      })}
    </>
  );
};

export default MenuItems;
