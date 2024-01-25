"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import placeholder from "../../images/placeholder-image.jpg";
import toast from "react-hot-toast";
const UseImageUpload = ({
  value,
  disabled,
  onChange,
  label,
}: {
  value: string;
  disabled?: boolean;
  onChange: (base64: string) => void;
  label: string;
}) => {
  const [type, setType] = useState<"url" | "file">("url");

  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: File[]) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    [handleChange, setBase64]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <section className="min-w-full flex items-center justify-center flex-col gap-4">
      <div className="min-w-full flex flex-wrap gap-2 justify-between items-center">
        <span className="w-fit capitalize text-lg text-black flex flex-col items-start justify-start">
          {label}
          <span className="text-[12px] text-neutral-500 capitalize text-left">
            {type === "file"
              ? "maximum file size is 2mb"
              : "you can insert your picture url here"}
          </span>
        </span>
        <div className="w-fit flex flex-row items-center justify-center gap-2">
          <button
            onClick={() => {
              setType("file");
            }}
            className={twMerge(
              "px-3 py-2 rounded-lg drop-shadow-2xl hover:scale-110 border-[1px] transition-all disabled:cursor-not-allowed",
              type === "file"
                ? "text-black border-black bg-transparent"
                : "text-white bg-rose-500 border-rose-500"
            )}
            disabled={disabled}
          >
            file
          </button>{" "}
          <button
            disabled={disabled}
            onClick={() => {
              setType("url");
            }}
            className={twMerge(
              "px-3 py-2 rounded-lg drop-shadow-2xl hover:scale-110 border-[1px] transition-all disabled:cursor-not-allowed",
              type === "url"
                ? "text-black border-black bg-transparent"
                : "text-white bg-rose-500 border-rose-500"
            )}
          >
            url
          </button>
        </div>
      </div>
      {type === "file" ? (
        <div
          {...getRootProps({
            className:
              "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-rose-500 cursor-pointer",
          })}
        >
          <input
            {...getInputProps({
              disabled: disabled,
            })}
            disabled={disabled}
          />
          {base64 ? (
            <div className="flex items-center justify-center">
              <Image
                src={base64}
                height="100"
                width="100"
                unoptimized={true}
                alt="Uploaded image"
              />
            </div>
          ) : (
            <p className="text-white">{label}</p>
          )}
        </div>
      ) : (
        <div className="flex min-w-full flex-col items-center justify-between gap-3">
          <input
            value={value}
            onChange={(e) => {
              setBase64(e.target.value);
              handleChange(e.target.value);
            }}
            className={twMerge(
              " peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed border-neutral-300 focus:border-black"
            )}
            disabled={disabled}
          />
          <div className="min-w-full relative max-h-[300px] max-w-[500px] aspect-video overflow-hidden h-fit object-contain">
            <Image
              alt="profile image"
              className="object-cover w-[300px] h-[300px] rounded-lg drop-shadow-2xl"
              src={base64 || placeholder.src}
              fill
              unoptimized={true}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default UseImageUpload;
