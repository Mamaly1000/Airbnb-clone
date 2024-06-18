"use client";
import React from "react";
import Container from "../ui/Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { safeUserType } from "@/types/safeuser";
import Categories from "../categories/Categories";
import { twMerge } from "tailwind-merge";
import NavbarWrapper from "./NavbarWrapper";
import useUser from "@/hooks/useUser";

const Navbar = ({ className }: { className?: string }) => {
  const { user } = useUser();
  return (
    <NavbarWrapper
      user={user}
      className={twMerge(!!Categories ? "py-0" : "py-4")}
    >
      <Container
        classname={twMerge(
          ` relative z-20 flex items-center justify-center py-4 max-h-[80px] md:max-h-[70px]
          border-b-[1px] border-neutral-200 dark:border-neutral-600`,
          className
        )}
      >
        <div className="min-w-full max-w-full flex flex-row items-center justify-between gap-1 md:gap-0 relative z-20">
          <Logo />
          <Search />
          <UserMenu user={user} />
        </div>
      </Container>
      <Categories />
    </NavbarWrapper>
  );
};

export default Navbar;
