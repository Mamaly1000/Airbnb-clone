"use client";
import Container from "@/components/ui/Container";
import { usePathname, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "./CategoryBox";
import { twMerge } from "tailwind-merge";
import useScrollAnimation from "@/hooks/useScroll";
export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property is has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activies!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is an ancient castle!",
  },
  {
    label: "Caves",
    icon: GiCaveEntrance,
    description: "This property is in a spooky cave!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in arctic environment!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const [displayLabels, setDisplayLabels] = useState(true);
  const { scrolled, isScrolling } = useScrollAnimation({});

  const isMain = pathname === "/";

  useEffect(() => {
    if (scrolled) {
      setDisplayLabels(false);
    } else {
      setDisplayLabels(true);
    }
  }, [scrolled]);

  if (!isMain) {
    return null;
  }

  return (
    <Container
      classname={twMerge(
        `pt-4 flex flex-row items-center 
        justify-between overflow-x-auto 
        gap-2 max-w-full z-0 py-3`,
        isScrolling && "sticky top-0 left-0",
        scrolled && " z-10 py-2 "
      )}
    >
      {categories.map((c) => {
        return (
          <CategoryBox
            className={twMerge(
              category?.toLowerCase() === c.label.toLowerCase()
                ? "border-b-neutral-800 text-neutral-800 dark:border-b-rose-500 dark:text-rose-500"
                : "border-transparent text-neutral-500 dark:text-gray-500"
            )}
            displayLabel={displayLabels}
            category={c}
            key={c.description}
          />
        );
      })}
    </Container>
  );
};

export default Categories;
