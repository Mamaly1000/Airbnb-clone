"use client";
import { useProfileModal } from "@/hooks/useProfileModal";
import useScrollAnimation from "@/hooks/useScroll";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AiFillProfile } from "react-icons/ai";
import { FaAirbnb } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { GrFavorite } from "react-icons/gr";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Avatar from "../ui/Avatar";
import useUser from "@/hooks/useUser";
import useLoginModal from "@/hooks/useLoginModal";

const BottomBar = () => {
  const { user } = useUser();
  const loginModal = useLoginModal();

  const router = useRouter();
  const pathname = usePathname();

  const EditprofileModal = useProfileModal();
  const { isScrolling, scrolled } = useScrollAnimation({});

  const items = [
    {
      id: 1,
      pathname: "/",
      label: "Explore",
      onClick: () => {
        router.push("/");
      },
      Icon: GoSearch,
    },
    {
      id: 2,
      label: "Dashboard",
      onClick: () => {
        router.push("/mydashboard");
      },
      Icon: MdOutlineSpaceDashboard,

      pathname: "/mydashboard",
    },
    {
      id: 3,
      label: "Trips",
      onClick: () => {
        router.push("/trips");
      },
      Icon: FaAirbnb,

      pathname: "/trips",
    },
    {
      id: 4,
      label: "Wishlist",
      onClick: () => {
        router.push("/favorites");
      },
      Icon: GrFavorite,

      pathname: "/favorites",
    },
    {
      id: 5,
      label: "Profile",
      onClick: () => {
        EditprofileModal.onOpen();
      },
      Icon: AiFillProfile,

      pathname: "/profile",
    },
  ];
  return (
    <motion.section
      className={twMerge(
        `fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-neutral-800 text-[#5B5B5B] dark:text-white   
        min-w-full max-w-full px-4 min-h-[80px] shadow-2xl shadow-gray-800 dark:shadow-gray-950  max-h-[80px] 
        flex items-center justify-between gap-3 md:hidden`
      )}
      animate={{ opacity: isScrolling && scrolled ? 0.5 : 1 }}
    >
      {items.map((i) => (
        <button
          key={i.id}
          className={twMerge(
            `flex items-center justify-between gap-1 flex-col font-light text-sm hover:text-rose-500`,
            pathname?.match(i.pathname) && "text-rose-500 font-bold"
          )}
          onClick={() => (!user ? loginModal.onOpen() : i.onClick())}
        >
          {i.label === "Profile" ? (
            <Avatar
              userId={user?.id}
              className="w-[25px] h-[25px] min-w-[25px] max-w-[25px] min-h-[25px] max-h-[25px] "
            />
          ) : (
            <i.Icon size={25} />
          )}
          <span className=" max-[350px]:hidden">{i.label}</span>
        </button>
      ))}
    </motion.section>
  );
};

export default BottomBar;
