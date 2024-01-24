"use client";
import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";
import placeholder from "@/images/navbar/placeholder.jpg";
import useProfileImage from "@/hooks/useProfileImage";

const Avatar = ({
  userId,
  className,
}: {
  className?: string;
  userId: string;
}) => {
  const { profile, isLoading } = useProfileImage(userId);
  return (
    <div
      className={twMerge(
        isLoading ? "animate-pulse" : "",
        className,
        "relative min-w-[45px] min-h-[45px] max-w-[45px] max-h-[45px] rounded-full aspect-video drop-shadow-2xl overflow-hidden"
      )}
    >
      <Image
        src={!!profile?.image ? profile.image : placeholder.src}
        fill
        alt={profile?.name || "profile image"}
        className="object-cover w-full"
      />
    </div>
  );
};

export default Avatar;
