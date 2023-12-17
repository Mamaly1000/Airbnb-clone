"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import logo from "@/images/navbar/logo.png";
const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      alt="airbnb logo"
      src={logo.src}
      className="hidden md:block cursor-pointer "
      height={100}
      width={100}
    />
  );
};

export default Logo;
