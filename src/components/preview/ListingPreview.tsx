"use client";
import { Listing } from "@prisma/client";
import Image from "next/image";
import React, { useMemo } from "react";
import { BiHome } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import RateInput from "../inputs/RateInput";
import Link from "next/link";
import { IconType } from "react-icons";
import { IoMdClose } from "react-icons/io";
import { safeListingType } from "@/types/safeListing";
import { useListingPreview } from "@/hooks/useListingPreview";

const ListingPreview = ({
  listingId,
  Listing,
}: {
  Listing: Listing | safeListingType;
  listingId: string;
}) => {
  const { id, onOpen, onClose } = useListingPreview();
  const isUnique = useMemo(() => {
    return listingId === id ? true : false;
  }, [listingId, id]);
  const Icon: IconType = isUnique ? IoMdClose : BiHome;

  return (
    <article
      onClick={(e) => {
        e.stopPropagation();
        onOpen({ id: listingId });
      }}
      className={twMerge(
        "transition-all duration-300 absolute top-0 end-0 z-20 ",
        isUnique
          ? "py-2 overflow-hidden fixed md:absolute top-[10px] md:top-[-10px] -end-2 md:end-0 w-full min-h-fit  md:w-[300px] md:h-[300px] rounded-md drop-shadow-2xl flex flex-col items-start justify-start gap-2"
          : " cursor-pointer w-[40px] h-[40px] rounded-full flex items-center justify-center",
        !isUnique ? "bg-rose-500" : "bg-neutral-100"
      )}
    >
      <section
        className={twMerge(
          isUnique ? "p-3 border-b-[1px] border-b-neutral-300" : "p-0",
          "min-w-full max-w-full gap-2 flex items-center justify-center "
        )}
      >
        {!!isUnique && (
          <h2 className="capitalize font-bold text-rose-500 max-w-[70%] line-clamp-1">
            {Listing.title}
          </h2>
        )}
        <Icon
          className={twMerge(
            "max-w-[25px] max-h-[25px] min-w-[25px] min-h-[25px] transition-all cursor-pointer",
            isUnique
              ? "text-rose-500 hover:scale-125 border-[1px] border-white hover:border-rose-500 rounded-full "
              : "text-white"
          )}
          onClick={(e) => {
            e.stopPropagation();
            if (isUnique) {
              onClose();
            } else {
              onOpen({ id: listingId });
            }
          }}
        />
      </section>
      {!!isUnique && (
        <>
          <section className="animate-slideIn delay-75 min-w-full relative aspect-video h-[150px] px-3 drop-shadow-2xl overflow-hidden pt-0">
            <Image
              alt={Listing.title}
              src={Listing.imageSrc}
              className="object-cover sm:object-contain md:object-cover w-full"
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
