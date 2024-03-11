"use client";
import useCountry from "@/hooks/useCountry";
import { safeUserType } from "@/types/safeuser";
import React, { useMemo } from "react";
import Avatar from "../navbar/Avatar";
import ListingCategory from "./listingCategory";
import { IconType } from "react-icons";
import dynamic from "next/dynamic";
import RateInput from "../inputs/RateInput";

const ListingInfo = ({
  user,
  listing,
}: {
  listing: {
    user: safeUserType;
    category?: {
      icon: IconType;
      label: string;
      description: string;
    };
    description: string;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    locationVlaue: string;
    id: string;
    rate: number;
  };
  user?: safeUserType | null;
}) => {
  const { getByValue } = useCountry();
  const Map = dynamic(() => import("@/components/Map/Map"), {
    ssr: false,
  });
  const location = useMemo(() => {
    if (listing.locationVlaue) {
      return getByValue(listing.locationVlaue);
    }
  }, [listing.locationVlaue, getByValue]);
  return (
    <div className="col-span-4 flex flex-col gap-8 overflow-hidden max-w-full">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div className="capitalize">hosted by {listing.user.name}</div>
          <Avatar src={listing.user.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500 dark:text-neutral-400">
          <div>{listing.guestCount} guests</div>
          <div>{listing.roomCount} rooms</div>
          <div>{listing.bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {listing.category && <ListingCategory category={listing.category} />}
      <hr />
      <div className="text-lg font-light text-neutral-500 dark:text-neutral-400">
        {listing.description}
      </div>
      <RateInput id={listing.id} val={listing.rate} readOnly size="20px" />
      <hr />
      {location && <Map center={location.latlng} />}
    </div>
  );
};

export default React.memo(ListingInfo);
