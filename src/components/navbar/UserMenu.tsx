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
import { useProfileModal } from "@/hooks/useProfileModal";
const UserMenu = ({ user }: { user: safeUserType | null }) => {
  const [isOpen, setOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentmodal = useRentModal();
  const EditprofileModal = useProfileModal();
  const router = useRouter();
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const onRent = useCallback(() => {
    if (!user) {
      toast.error("please login to your account!");
      loginModal.onOpen();
    } else {
      rentmodal.onOpen();
    }
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
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute rounded-xl shadow-md  min-w-fit w-[40vw] md:w-3/4 md:min-w-fit bg-white overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer min-w-fit">
            <MenuItems
              items={
                user
                  ? [
                      {
                        id: 2340,
                        label: "My trips",
                        onClick: () => {
                          router.push("/trips");
                        },
                      },
                      {
                        id: 67754,
                        label: "My favorites",
                        onClick: () => {
                          router.push("/favorites");
                        },
                      },
                      {
                        id: 63453,
                        label: "My reservations",
                        onClick: () => {
                          router.push("/reservations");
                        },
                      },
                      {
                        id: 63345,
                        label: "My properties",
                        onClick: () => {
                          router.push("/properties");
                        },
                      },
                      {
                        id: 4345,
                        label: "Airbnb my home",
                        onClick: onRent,
                      },
                      {
                        id: 456,
                        label: "Outdated Reservations",
                        onClick: () => {
                          router.push(`/outdated`);
                        },
                      },
                      {
                        id: 67453564,
                        label: "Feedbacks",
                        onClick: () => {
                          router.push("/feedbacks");
                        },
                      },
                      {
                        id: 7456345,
                        label: "Completed Reservations",
                        onClick: () => {
                          router.push(`/completed-reservations`);
                        },
                        hr: true,
                      },
                      {
                        id: 324534565,
                        label: "edit your profile",
                        onClick: () => {
                          EditprofileModal.onOpen();
                        },
                      },
                      {
                        id: 7455345,
                        label: "log out",
                        onClick: () => {
                          signOut();
                        },
                      },
                    ]
                  : [
                      {
                        id: 125435,
                        label: "Login",
                        onClick: () => {
                          loginModal.onOpen();
                        },
                      },
                      {
                        id: 654645,
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
