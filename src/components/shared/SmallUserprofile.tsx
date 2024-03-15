"use client";
import { safeUserType } from "@/types/safeuser";
import React from "react";
import { twMerge } from "tailwind-merge";
import Avatar from "../ui/Avatar";

const SmallUserprofile = ({ user }: { user: safeUserType | null }) => {
  return user ? (
    <section
      className={twMerge(
        `min-w-full max-w-full flex flex-col items-center justify-center gap-2`
      )}
    >
      <Avatar
        className={twMerge(`
        min-w-[35px] max-w-[35px] min-h-[35px] max-h-[35px] 
        md:min-w-[50px] md:max-w-[50px] md:min-h-[50px] max:max-h-[50px] 
        lg:min-w-[100px] lg:max-w-[100px] lg:min-h-[100px] lg:max-h-[100px]  
        `)}
        userId={user.id}
      />
      <div className=" hidden md:flex min-w-full max-w-full items-center justify-center flex-col capitalize">
        <p className="text-[13px] text-gray-400 dark:text-gray-300 mb-1">
          wellcome back
        </p>
        <p className="text-[16px] text-black dark:text-white font-semibold">
          {user.name}
        </p>
        <p className="text-[13px] font-light text-gray-400 dark:text-gray-300">
          {user.email}
        </p>
      </div>
    </section>
  ) : (
    <section
      className={twMerge(
        `min-w-full max-w-full flex flex-col items-center justify-center gap-2`
      )}
    >
      <div
        className="   min-w-[35px] max-w-[35px] min-h-[35px] max-h-[35px] 
        md:min-w-[50px] md:max-w-[50px] md:min-h-[50px] max:max-h-[50px] 
        lg:min-w-[100px] lg:max-w-[100px] lg:min-h-[100px] lg:max-h-[100px]   rounded-full bg-neutral-300 dark:bg-neutral-600 drop-shadow-2xl"
      ></div>
      <div className="min-w-full max-w-full items-center justify-center flex-col capitalize hidden md:flex">
        <p className="text-[13px] text-gray-400 dark:text-gray-300 mb-1">
          wellcome back
        </p>
        <p className="min-w-[100px] min-h-[10px] rounded-full  mb-1 bg-neutral-300 dark:bg-neutral-600"></p>
        <p className="min-w-[70px] min-h-[8px] rounded-full bg-neutral-300 dark:bg-neutral-600"></p>
      </div>
    </section>
  );
};

export default SmallUserprofile;
