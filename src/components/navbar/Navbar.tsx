"use client";
import React from "react";
import Container from "../ui/Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { safeUserType } from "@/types/safeuser";

const Navbar = ({ user }: { user: safeUserType | null }) => {
  return (
    <div className="fixed min-w-full bg-white min-h-[50px] z-10  shadow-sm shadow-gray-400 py-4">
      <Container>
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          <Logo />
          <Search />
          <UserMenu user={user} />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
