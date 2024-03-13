"use client";
import { safeListingType } from "@/types/safeListing";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import useScrollAnimation from "@/hooks/useScroll";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

const ListingBar = ({ listing }: { listing: safeListingType }) => {
  const { isScrolling, scrolled } = useScrollAnimation({});
  return (
    <AnimatePresence>
      {!scrolled && (
        <motion.section
          className={twMerge(
            `fixed top-[70px] left-0 z-20
        min-w-full max-w-full flex flex-wrap gap-2 items-center justify-between  
         p-2 drop-shadow-2xl bg-white border-b-[1px]
          border-neutral-400 dark:bg-neutral-900 text-black dark:text-white`
          )}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            translateY: isScrolling && scrolled ? -70 : 0,
          }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-wrap items-center justify-start gap-3 md:gap-10">
            <h1 className="  text-left text-[14px] md:text-[20px] capitalize font-semibold text-inherit">
              {listing.title}
            </h1>
            <div className="flex flex-row items-center gap-1 text-[12px] md:text-[14px] ">
              <div className="font-semibold">$ {listing.price}</div>
              <div className="font-light ">per night</div>
            </div>
          </div>

          <Link
            className="w-full md:w-fit text-center px-3 py-2 rounded-lg bg-rose-500 text-white drop-shadow-2xl active:scale-90 hover:scale-105 font-light capitalize"
            href={`/listings/${listing.id}`}
          >
            book now
          </Link>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default ListingBar;
