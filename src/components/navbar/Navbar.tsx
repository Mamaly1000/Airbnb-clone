"use client";
import React from "react";
import Container from "../ui/Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { safeUserType } from "@/types/safeuser";
import Categories from "../categories/Categories";
import { twMerge } from "tailwind-merge";
import useScrollAnimation from "@/hooks/useScroll";

const Navbar = ({
  user,
  className,
}: {
  className?: string;
  user: safeUserType | null;
}) => {
  const { scrolled, isScrolling } = useScrollAnimation({});
  return (
    <div
      className={twMerge(
        "fixed top-0 left-0 min-w-full max-w-full min-h-[50px] z-10 bg-inherit shadow-sm shadow-gray-400 ",
        !!Categories ? "py-0" : "py-4",
        scrolled && isScrolling && "translate-y-[-70px]"
      )}
    >
      <Container
        classname={twMerge(
          `border-b-[1px] flex items-center justify-center dark:border-neutral-500 py-4 max-h-[70px]`,
          className
        )}
      >
        <div className="min-w-full max-w-full flex flex-row items-center justify-between gap-3 md:gap-0">
          <Logo />
          <Search />
          <UserMenu user={user} />
        </div>
      </Container>
      <Categories />
    </div>
  );
};

export default Navbar;
