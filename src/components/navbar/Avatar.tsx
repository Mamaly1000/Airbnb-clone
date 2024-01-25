"use client";
import Image from "next/image";
import React from "react";
import placeholder from "@/images/navbar/placeholder.jpg";
const Avatar = ({ src }: { src: string | null }) => {
  return (
    <Image
      alt="avatar"
      src={src || placeholder.src}
      width={30}
      unoptimized={true}
      height={30}
      className="rounded-full object-cover drop-shadow-2xl min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px] w-[30px] h-[30px]"
    />
  );
};

export default Avatar;
