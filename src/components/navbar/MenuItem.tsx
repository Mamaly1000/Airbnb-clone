import Image from "next/image";
import React from "react";
import { IconType } from "react-icons";

const MenuItem = ({
  label,
  onClick,
  Icon,
}: {
  Icon?: any;
  label: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="flex items-center justify-between gap-2 px-4 py-3 hover:bg-neutral-100 transition font-semibold"
      onClick={onClick}
    >
      {label}{" "}
      {Icon && typeof Icon === "string" ? (
        <Image src={Icon} alt={label} width={25} height={25} />
      ) : (
        Icon
      )}
    </div>
  );
};

export default MenuItem;
