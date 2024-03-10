"use client";
import React from "react";
import Container from "../ui/Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { safeUserType } from "@/types/safeuser";
import Categories from "../categories/Categories";
import { twMerge } from "tailwind-merge";

const Navbar = ({
  user,
  className,
}: {
  className?: string;
  user: safeUserType | null;
}) => {
  return (
    <div
      className={twMerge(
        "fixed min-w-full max-w-full min-h-[50px] z-10 bg-inherit shadow-sm shadow-gray-400 ",
        !!Categories ? "py-0" : "py-4"
      )}
    >
      <Container
        classname={twMerge(
          `border-b-[1px] dark:border-neutral-800 py-4`,
          className
        )}
      >
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
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
