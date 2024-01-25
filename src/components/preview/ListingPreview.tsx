"use client";
import { Listing } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { BiHome } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import RateInput from "../inputs/RateInput";
import Link from "next/link";
import { IconType } from "react-icons";
import { IoMdClose } from "react-icons/io";

const ListingPreview = ({
  Listing,
  expand,
  setExpand,
}: {
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
  expand: boolean;
  Listing: Listing;
}) => {
  const Icon: IconType = expand ? IoMdClose : BiHome;

  return (
    <article
      onClick={(e) => {
        e.stopPropagation();
        setExpand(true);
      }}
      className={twMerge(
        "transition-all duration-300 absolute top-0 end-0 z-20 ",
        expand
          ? "py-2 absolute top-[10px] md:top-[-10px] -end-2 md:end-0 w-full min-h-fit  md:w-[300px] md:h-[300px] rounded-md drop-shadow-2xl flex flex-col items-start justify-start gap-2"
          : " cursor-pointer w-[40px] h-[40px] rounded-full flex items-center justify-center",
        !expand ? "bg-rose-500" : "bg-neutral-100"
      )}
      onMouseLeave={(e) => {
        e.stopPropagation();
        if (expand) {
          setExpand(false);
        }
      }}
    >
      <section
        className={twMerge(
          expand ? "p-3" : "p-0",
          "min-w-full max-w-full gap-2 flex items-center justify-center "
        )}
      >
        {!!expand && (
          <h2 className="capitalize font-bold text-rose-500 max-w-[70%] line-clamp-1">
            {Listing.title}
          </h2>
        )}
        <Icon
          className={twMerge(
            "max-w-[25px] max-h-[25px] min-w-[25px] min-h-[25px] transition-all cursor-pointer",
            expand
              ? "text-rose-500 hover:scale-125 border-[1px] border-white hover:border-rose-500 rounded-full "
              : "text-white"
          )}
          onClick={(e) => {
            e.stopPropagation();
            setExpand((prev) => !prev);
          }}
        />
      </section>
      {!!expand && (
        <>
          <section className="animate-slideIn delay-75 min-w-full relative aspect-video h-[150px] px-3 drop-shadow-2xl overflow-hidden">
            <Image
              alt={Listing.title}
              src={Listing.imageSrc}
              className="object-cover w-full"
              fill
            />
          </section>
          <section className="animate-slideIn delay-75">
            <p className="font-semibold font-sans line-clamp-2 text-left text-[12px] px-3">
              {Listing.description}
            </p>
          </section>
          <section className="min-w-full px-3 flex items-center justify-between gap-2 animate-slideIn delay-75">
            <RateInput
              id={Listing.id}
              val={Listing.rate}
              readOnly
              size="15px"
              className="min-w-fit"
            />
            <Link
              href={`/listings/${Listing.id}`}
              className="px-3 py-2 rounded-md drop-shadow-2xl text-white bg-rose-500 text-[10px] capitalize whitespace-nowrap hover:bg-transparent  hover:text-rose-500 transition-all border-[1px] border-rose-500 hover:scale-110"
            >
              Reserve now
            </Link>
          </section>
        </>
      )}
    </article>
  );
};

export default ListingPreview;
