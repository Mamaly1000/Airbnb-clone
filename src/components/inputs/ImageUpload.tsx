"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
declare global {
  var cloudinary: any;
}

const ImageUpload = ({
  onChange,
  value,
  className,
}: {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const handleUpload = useCallback(
    (results: any) => {
      onChange(results.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="ikjysf9b"
      options={{
        maxFiles: 1,
        styles: {
          palette: isDarkMode
            ? {
                window: "#262626",
                sourceBg: "#262626",
                windowBorder: "#898585",
                tabIcon: "#F43F5E",
                inactiveTabIcon: "#898585",
                menuIcons: "#F43F5E",
                link: "#F43F5E",
                action: "#F43F5E",
                inProgress: "#F43F5E",
                complete: "#33ff00",
                error: "#EA2727",
                textDark: "#262626",
                textLight: "#FFFFFF",
              }
            : {
                window: "#FFFFFF",
                sourceBg: "#FEFEFE",
                windowBorder: "#898585",
                tabIcon: "#F43F5E",
                inactiveTabIcon: "#898585",
                menuIcons: "#F43F5E",
                link: "#F43F5E",
                action: "#F43F5E",
                inProgress: "#F43F5E",
                complete: "#33ff00",
                error: "#EA2727",
                textDark: "#262626",
                textLight: "#FFFFFF",
              },
        },
        sources: ["local", "url", "camera"],
        resourceType: "image",
        clientAllowedFormats: ["webp", "png", "jpeg"],
      }}
    >
      {({ open }) => {
        return (
          <div
            className={twMerge(
              className,
              "relative cursor-pointer hover:opacity-70 transition border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 "
            )}
            onClick={() => {
              if (!!open) {
                open!();
              } else {
                toast.error("Please wait for Cloudinary Service!");
              }
            }}
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full ">
                <Image
                  src={value}
                  alt="selected image"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
