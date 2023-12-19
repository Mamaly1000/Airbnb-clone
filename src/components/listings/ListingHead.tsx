"use client";
import useCountry from "@/hooks/useCountry";
import { safeUserType } from "@/types/safeuser";
import React, { useMemo } from "react";
import Heading from "../form/Heading";
import Image from "next/image";
import HeartButton from "../inputs/HeartButton";

const ListingHead = ({
  listing,
  user,
}: {
  listing: {
    title: string;
    image: string;
    locationValue: string;
    id: string;
    user: safeUserType;
  };
  user?: safeUserType | null;
}) => {
  const { getByValue } = useCountry();
  const location = useMemo(() => {
    if (listing.locationValue) {
      return getByValue(listing.locationValue);
    }
  }, [listing.locationValue]);
  return (
    <>
      <Heading
        title={listing.title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={listing.image}
          alt={listing.title}
          blurDataURL={listing.image}
          placeholder="blur"
          fill
          className="object-cover w-full "
        />
        <div className="absolute top-5 end-5">
          <HeartButton id={listing.id} user={user} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
