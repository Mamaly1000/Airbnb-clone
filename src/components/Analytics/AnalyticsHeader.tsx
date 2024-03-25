"use client";
import {
  AnalyticsCategoryTypes,
  AnalyticsTopicsType,
  useAnalytics,
} from "@/hooks/useAnalytics";
import React, { useMemo } from "react";
import CustomSelect from "../inputs/CustomSelect";
import { format } from "date-fns";
import { useRangeDateModal } from "@/hooks/useRangeDateModal";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { GoCodeReview } from "react-icons/go";
import { IoPricetagsOutline } from "react-icons/io5";
import { TbHomeStats, TbReportAnalytics } from "react-icons/tb";
import { MdHomeWork } from "react-icons/md";

const analyticsCategories: {
  label: string;
  value: AnalyticsCategoryTypes;
  icon: IconType;
}[] = [
  { value: "FEEDBACK", label: "reviews", icon: GoCodeReview },
  { value: "LISTING", label: "properties", icon: MdHomeWork },
  { value: "RESERVATION", label: "reservations", icon: IoPricetagsOutline },
  { value: "SINGLE_LISTING", label: "single property", icon: TbHomeStats },
];

export const listingTopic: AnalyticsTopicsType = {
  type: "LISTING",
  topics: [
    {
      label: "Distribution of listings by category",
      value: "LISTING_CATEGORY_COUNT",
    },
    {
      label: "Average price of listings by category",
      value: "LISTING_CATEGORY_PRICE",
    },
    {
      label: "Number of listings per location",
      value: "LISTING_LOCATION_COUNT",
    },
    {
      label:
        "Distribution of room count, bathroom count, and guest count in listings",
      value: "LISTING_ENTITIES_COUNT",
    },
    { label: "Average rating of listings", value: "LISTING_RATE_AVERAGE" },
    { label: "Number of views per listing", value: "LISTING_VIEWS_COUNT" },
  ],
};
export const reservationsTopic: AnalyticsTopicsType = {
  type: "RESERVATION",
  topics: [
    {
      label: "Number of reservations over time",
      value: "RESERVATION_CREATED_COUNT",
    },
    {
      label: "Total revenue generated from reservations",
      value: "RESERVATION_REVENUE_COUNT",
    },
    {
      label:
        "Distribution of reservation statuses (e.g., pending, confirmed, canceled)",
      value: "RESERVATION_STATUS",
    },
    {
      label: "Average total price of reservations",
      value: "RESERVATION_DATE_TOTALPRICE",
    },
    {
      label: "Number of reservations per user",
      value: "RESERVATION_USER_COUNT",
    },
  ],
};
export const feedbackTopics: AnalyticsTopicsType = {
  type: "FEEDBACK",
  topics: [
    {
      label:
        "Average ratings for cleanliness, accuracy, check-in experience, communication, location, and value",
      value: "FEEDBACK_TOTAL_AVERAGE",
    },
    {
      label: "Number of feedbacks per listing",
      value: "FEEDBACK_LISTING_COUNT",
    },
    {
      label: "Distribution of feedback ratings (e.g., 1 star, 2 stars, etc.)",
      value: "FEEDBACK_RATE_COUNT",
    },
    { label: "Average rating given by users", value: "FEEDBACK_USERS_AVERAGE" },
  ],
};
export const allTopics = [listingTopic, reservationsTopic, feedbackTopics];
const AnalyticsHeader = () => {
  const { Date, onOpen } = useRangeDateModal();
  const { setCategory, setTopic, category, topic } = useAnalytics();
  const topics = useMemo(() => {
    return (
      [listingTopic, reservationsTopic, feedbackTopics].find(
        (t) => t.type === category
      )?.topics || []
    );
  }, [category]);

  return (
    <section className="min-w-full max-w-full flex-wrap items-center pb-5 justify-start gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
      <button
        className="min-h-[64.9px] max-h-[64.9px] rounded-[5px] drop-shadow-2xl flex items-center justify-between gap-2 flex-wrap border-[1px] border-neutral-300 hover:border-neutral-400 px-6 py-2 active:border-rose-500 focus:border-rose-500"
        onClick={() => {
          onOpen();
        }}
      >
        <span className="text-black dark:text-white text-sm">TimeFrame:</span>
        <motion.div
          key={`${
            Date.startDate?.toISOString()! + Date.endDate?.toISOString()
          }`}
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.1, ease: "linear" }}
          className="flex items-center justify-center gap-1 font-semibold text-sm capitalize text-black dark:text-rose-500 "
        >
          {format(Date.startDate!, "MMM dd, yyyy")}
          {" - "}
          {format(Date.endDate!, "MMM dd, yyyy")}
        </motion.div>
      </button>
      <CustomSelect
        onChange={(newVal) =>
          setCategory(newVal?.value as AnalyticsCategoryTypes)
        }
        value={
          category
            ? {
                icon: analyticsCategories.find((i) => i.value === category)
                  ?.icon!,
                label: analyticsCategories.find((i) => i.value === category)
                  ?.label!,
                value: analyticsCategories.find((i) => i.value === category)
                  ?.value!,
              }
            : undefined
        }
        options={analyticsCategories}
        placeholder="select category..."
      />
      <CustomSelect
        onChange={(newVal) => setTopic(newVal?.value as any)}
        value={
          topic
            ? {
                value: topic,
                label: topics.find((i) => i.value === topic)?.label!,
                icon: TbReportAnalytics,
              }
            : undefined
        }
        options={topics.map((i) => ({
          ...i,
          icon: TbReportAnalytics,
        }))}
        placeholder="select topic..."
      />
    </section>
  );
};

export default AnalyticsHeader;
