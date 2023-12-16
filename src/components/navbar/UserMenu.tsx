"use client";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import MenuItems from "./MenuItems";
import useRegisterModal from "@/hooks/useAuthModal";
import useLoginModal from "@/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { safeUserType } from "@/types/safeuser";
const UserMenu = ({ user }: { user: safeUserType | null }) => {
  const [isOpen, setOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative capitalize">
      <div className="flex flex-row items-center gap-3 ">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={toggleOpen}
        >
          Airbnb your home
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={user ? user.image : null} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <MenuItems
              items={
                user
                  ? [
                      {
                        label: "My trips",
                        onClick: () => {},
                      },
                      {
                        label: "My favorites",
                        onClick: () => {},
                      },
                      {
                        label: "My reservations",
                        onClick: () => {},
                      },
                      {
                        label: "My properties",
                        onClick: () => {},
                      },
                      {
                        label: "Airbnb my home",
                        onClick: () => {},
                        hr: true,
                      },
                      {
                        label: "log out",
                        onClick: () => {
                          signOut();
                        },
                      },
                    ]
                  : [
                      {
                        label: "Login",
                        onClick: () => {
                          loginModal.onOpen();
                        },
                      },
                      {
                        label: "SignUp",
                        onClick: () => {
                          registerModal.onOpen();
                        },
                      },
                    ]
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
