"use client";
import React, { useCallback, useState } from "react";
import { AiOutlineLogin, AiOutlineMenu } from "react-icons/ai";
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
import { AnimatePresence, motion } from "framer-motion";
import ToggleTheme from "./ToggleTheme";
import { useTheme } from "@/hooks/useTheme";
import { LuMoonStar } from "react-icons/lu";
import { GoSun } from "react-icons/go";
import { RiLogoutCircleLine } from "react-icons/ri";
import NotifToggle from "./NotifToggle";
const UserMenu = ({ user }: { user: safeUserType | null }) => {
  const [isOpen, setOpen] = useState(false);

  const { mode, setTheme } = useTheme();
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
      <div className="flex flex-row items-center gap-3 [&>button:hover]:border-rose-500 [&>button:hover]:text-rose-500">
        <button
          className="hidden border-[1px] border-neutral-200 md:block text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer"
          onClick={onRent}
        >
          Airbnb your home
        </button>
        <NotifToggle />
        <ToggleTheme className="hidden md:flex" />
        <button
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={user ? user.image : null} />
          </div>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onPointerLeave={() => setOpen(false)}
            initial={{ opacity: 0, translateY: 10 }}
            exit={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ ease: "linear", duration: 0.12 }}
            onMouseLeave={() => setOpen(false)}
            className="absolute rounded-xl min-w-fit w-[40vw] md:w-3/4 md:min-w-fit bg-white dark:bg-neutral-900  shadow-md text-inherit max-[400px]:scroll-hidden max-h-[60vh] md:max-w-[90vh] overflow-x-hidden overflow-y-auto right-0 top-[55px] md:top-12 text-sm"
          >
            <div className="flex flex-col cursor-pointer min-w-fit">
              <MenuItems
                items={
                  user
                    ? [
                        {
                          id: 6323454567856,
                          label: "Home",
                          onClick: () => {
                            router.push("/");
                          },
                        },
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
                          Icon: RiLogoutCircleLine,
                        },
                        {
                          label: (mode === "dark" ? "light" : "dark") + " mode",
                          onClick: () => setTheme(),
                          Icon: mode !== "dark" ? LuMoonStar : GoSun,
                          id: 23984219412039,
                          mobileOnly: true,
                        },
                      ]
                    : [
                        {
                          id: 125435,
                          label: "Login",
                          onClick: () => {
                            loginModal.onOpen();
                          },
                          Icon: AiOutlineLogin,
                        },
                        {
                          id: 654645,
                          label: "SignUp",
                          onClick: () => {
                            registerModal.onOpen();
                          },
                        },
                        {
                          label: (mode === "dark" ? "light" : "dark") + " mode",
                          onClick: () => setTheme(),
                          Icon: mode !== "dark" ? LuMoonStar : GoSun,
                          id: 23984219412039,
                          mobileOnly: true,
                        },
                      ]
                }
                onClose={() => setOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
