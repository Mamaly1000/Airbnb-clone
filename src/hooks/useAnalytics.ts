"use client";

import { sub } from "date-fns";
import { type } from "os";
import { Range } from "react-date-range";
import { create } from "zustand";

export type AnalyticsCategoryTypes =
  | "RESERVATION"
  | "FEEDBACK"
  | "LISTING"
  | "SINGLE_LISTING";
export type AnalyticsTopicsType =
  | {
      type: "LISTING";
      topics: { label: string; value: LISTING_TOPICS_TYPES }[];
    }
  | {
      type: "RESERVATION";
      topics: { label: string; value: RESERVATION_TOPICS_TYPES }[];
    }
  | {
      type: "FEEDBACK";
      topics: { label: string; value: FEEDBACK_TOPICS_TYPES }[];
    };
export type LISTING_TOPICS_TYPES =
  | "LISTING_CATEGORY_COUNT"
  | "LISTING_CATEGORY_PRICE"
  | "LISTING_LOCATION_COUNT"
  | "LISTING_ENTITIES_COUNT"
  | "LISTING_RATE_AVERAGE"
  | "LISTING_VIEWS_COUNT";
export type RESERVATION_TOPICS_TYPES =
  | "RESERVATION_CREATED_COUNT"
  | "RESERVATION_REVENUE_COUNT"
  | "RESERVATION_STATUS"
  | "RESERVATION_DATE_TOTALPRICE"
  | "RESERVATION_USER_COUNT";
export type FEEDBACK_TOPICS_TYPES =
  | "FEEDBACK_TOTAL_AVERAGE"
  | "FEEDBACK_LISTING_COUNT"
  | "FEEDBACK_RATE_COUNT"
  | "FEEDBACK_USERS_VAERAGE";
interface useAnalyticsStore {
  timeFrame: Range;
  setTimeFrame: (timeframe: Range) => void;
  category?: AnalyticsCategoryTypes;
  setCategory: (type: AnalyticsCategoryTypes) => void;
  topic?:
    | LISTING_TOPICS_TYPES
    | RESERVATION_TOPICS_TYPES
    | FEEDBACK_TOPICS_TYPES;

  setTopic: (
    topic:
      | LISTING_TOPICS_TYPES
      | RESERVATION_TOPICS_TYPES
      | FEEDBACK_TOPICS_TYPES
  ) => void;
}
export const useAnalytics = create<useAnalyticsStore>((set) => ({
  category: "LISTING",
  setCategory: (category) => set({ category }),
  timeFrame: {
    startDate: sub(new Date(), { days: 10 }),
    endDate: new Date(),
    key: "selected",
  },
  setTimeFrame: (timeFrame) => set({ timeFrame }),
  topic: "LISTING_CATEGORY_COUNT",
  setTopic: (topic) => set({ topic }),
}));
