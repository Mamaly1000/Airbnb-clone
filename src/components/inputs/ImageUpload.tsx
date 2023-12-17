"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
declare global {
  var cloudinary: any;
}

const ImageUpload = ({
  onChange,
  value,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
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
      }}
    >
      {({ open }) => {
        return (
          <div
            className="relative cursor-pointer hover:opacity-70 transition border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 "
            onClick={() => {
              if (open) open?.();
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
