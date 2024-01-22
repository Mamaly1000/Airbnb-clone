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
  }[];
}) => {
  return (
    <>
      {items?.map((item) => {
        return (
          <Fragment key={item.id}>
            <MenuItem
              label={item.label}
              onClick={item.onClick}
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
