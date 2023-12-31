"use client";
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import MenuItems from "./MenuItems";
import useRegisterModal from "@/hooks/useAuthModal";
import useLoginModal from "@/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { safeUserType } from "@/types/safeuser";
import toast from "react-hot-toast";
import useRentModal from "@/hooks/useRentModal";
import { useRouter } from "next/navigation";
const UserMenu = ({ user }: { user: safeUserType | null }) => {
  const [isOpen, setOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentmodal = useRentModal();
  const router = useRouter();
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const onRent = useCallback(() => {
    if (!user) {
      toast.error("please login to your account!");
      loginModal.onOpen();
    }
    rentmodal.onOpen();
  }, [user, loginModal, rentmodal]);

  return (
    <div className="relative capitalize">
      <div className="flex flex-row items-center gap-3 ">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onRent}
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
                        onClick: () => {
                          router.push("/trips");
                        },
                      },
                      {
                        label: "My favorites",
                        onClick: () => {
                          router.push("/favorites");
                        },
                      },
                      {
                        label: "My reservations",
                        onClick: () => {
                          router.push("/reservations");
                        },
                      },
                      {
                        label: "My properties",
                        onClick: () => {
                          router.push("/properties");
                        },
                      },
                      {
                        label: "Airbnb my home",
                        onClick: onRent,
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
