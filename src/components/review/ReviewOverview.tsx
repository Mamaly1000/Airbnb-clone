"use client";
import React from "react";
import { FeedbackOverallDataType } from "@/actions/getFeedbacks";
import { safeListingType } from "@/types/safeListing";
import { GoKey, GoStarFill } from "react-icons/go";
import BarChartRating from "./BarChartRating";
import RateBox from "./RateBox";
import { GiVacuumCleaner } from "react-icons/gi";
import { IoCloudDoneOutline } from "react-icons/io5";
import { BsChatSquare, BsMap } from "react-icons/bs";
import { CiShoppingTag } from "react-icons/ci";
import Hr from "../ui/Hr";
const ReviewOverview = ({
  listing,
  overallRates,
}: {
  listing: safeListingType;
  overallRates: FeedbackOverallDataType;
}) => {
  return (
    <div className="min-w-full max-w-full overflow-hidden flex flex-col gap-3">
      <p className=" font-extralight text-[90px] text-black dark:text-white flex items-center gap-1 min-w-full max-w-full text-left justify-start">
        <GoStarFill size={70} /> {listing.rate.toFixed(2)}
      </p>
      <section className="min-w-full overflow-x-auto overflow-y-hidden min-h-fit flex items-center justify-start gap-8 pb-2">
        <BarChartRating
          data={overallRates.map((r) => r.rating)}
          label="overall rating"
        />
        <Hr />
        <RateBox
          label="cleanliness"
          value={overallRates.map((r) => r.cleanliness)}
          Icon={GiVacuumCleaner}
        />
        <Hr />
        <RateBox
          label="accuracy"
          value={overallRates.map((r) => r.accuracy)}
          Icon={IoCloudDoneOutline}
        />
        <Hr />
        <RateBox
          label="check in"
          value={overallRates.map((r) => r.checkIn)}
          Icon={GoKey}
        />
        <Hr />
        <RateBox
          label="communication"
          value={overallRates.map((r) => r.communication)}
          Icon={BsChatSquare}
        />{" "}
        <Hr />
        <RateBox
          label="location"
          value={overallRates.map((r) => r.location)}
          Icon={BsMap}
        />{" "}
        <Hr />
        <RateBox
          label="value"
          value={overallRates.map((r) => r.value)}
          Icon={CiShoppingTag}
        />
      </section>
    </div>
  );
};

export default ReviewOverview;
