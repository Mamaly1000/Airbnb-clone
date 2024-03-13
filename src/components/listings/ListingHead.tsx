"use client";
import useCountry from "@/hooks/useCountry";
import { safeUserType } from "@/types/safeuser";
import React, { useMemo } from "react";
import Heading from "../form/Heading";
import Image from "next/image";
import HeartButton from "../inputs/HeartButton";
import { motion } from "framer-motion";

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
  }, [listing.locationValue, getByValue]);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, translateX: -100 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 1, ease: "linear" }}
      >
        <Heading
          title={listing.title}
          subtitle={`${location?.region}, ${location?.label}`}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ ease: "linear", duration: 1 }}
        className="w-full overflow-hidden rounded-xl relative aspect-video"
      >
        <Image
          src={listing.image}
          alt={listing.title}
          blurDataURL={listing.image}
          placeholder="blur"
          fill
          className=" w-full  object-cover"
        />
        <div className="absolute top-5 end-5">
          <HeartButton id={listing.id} />
        </div>
      </motion.div>
    </>
  );
};

export default ListingHead;
