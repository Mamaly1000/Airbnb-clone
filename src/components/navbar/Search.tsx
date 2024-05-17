"use client";
import useCountry from "@/hooks/useCountry";
import useSearchModal from "@/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountry();
  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Anywhere";
  }, [locationValue, getByValue]);
  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }
    return "Any Week";
  }, [startDate, endDate]);
  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);
  return (
    <>
      <div
        onClick={() => searchModal.onOpen()}
        className={twMerge(
          `hidden md:block border-[1px] border-neutral-200 dark:border-neutral-600 
          w-full md:w-auto py-2 rounded-full 
          shadow-sm hover:shadow-md transition cursor-pointer 
          capitalize hover:scale-105 active:scale-95 group
         hover:border-rose-500 dark:hover:border-rose-500
         `
        )}
      >
        <div className="flex flex-row items-center justify-between ">
          <div className="text-sm font-semibold px-4">{locationLabel}</div>
          <div className="hidden sm:block text-sm font-semibold px-4 border-x-[1px] flex-1 text-center ">
            {durationLabel}
          </div>
          <div className="text-sm pl-6 pr-2 text-gray-600 dark:text-gray-400 flex flex-row items-center gap-3 ">
            <div className="hidden sm:block ">{guestLabel}</div>
            <div className="p-2 bg-rose-500 rounded-full text-white drop-shadow-2xl group-hover:animate-pulse">
              <BiSearch />
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => searchModal.onOpen()}
        className="flex md:hidden gap-2 items-center justify-between px-[20px] py-2
        border-[1px] border-neutral-200 dark:border-neutral-600 
        hover:border-rose-500 dark:hover:border-rose-500 
        drop-shadow-2xl w-full rounded-full 
        shadow-sm hover:shadow-md transition cursor-pointer 
        capitalize active:scale-95 group
        max-h-[60px] "
      >
        <div className="flex items-center gap-2 justify-start">
          <CiSearch className="text-black dark:text-white" size={25} />
          <div className="flex flex-col items-start justify-start text-black dark:text-white text-sm capitalize line-clamp-1">
            <span className="text-[16px] font-semibold  whitespace-nowrap">
              Where to?
            </span>
            <span className="flex items-center justify-start gap-1 text-[#858585] dark:text-[#a4a4a4] text-[13px] whitespace-nowrap line-clamp-1 max-w-full">
              <span className="">{locationLabel}</span>
              <span className="hidden sm:block">- {durationLabel}</span>
              <span className="hidden sm:block">- {guestLabel}</span>
            </span>
          </div>
        </div>
        <div className="rounded-full border-[1px] border-neutral-200 dark:border-neutral-600 p-2 flex items-center justify-center">
          <VscSettings className="text-black dark:text-white" size={20} />
        </div>
      </div>
    </>
  );
};

export default Search;
