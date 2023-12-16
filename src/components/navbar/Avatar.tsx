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
      height={30}
      className="rounded-full drop-shadow-2xl"
    />
  );
};

export default Avatar;
