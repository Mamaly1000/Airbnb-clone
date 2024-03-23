"use client";

import { ReviewSortTypes, ReviewsStatusTypes } from "@/types/ReviewTypes";
import { ReviewQueryHookType } from "./useReviews";
import { Range } from "react-date-range";
import { create } from "zustand";
import { sub } from "date-fns";

interface useReviewTableStore {
  hiddenRows: ReviewsStatusTypes[];
  hiddenCols: ReviewSortTypes[];
  setHiddenRows: (rows: ReviewsStatusTypes[]) => void;
  setHiddenCols: (rows: ReviewSortTypes[]) => void;
  searchParams: ReviewQueryHookType;
  setQuery: (query: ReviewQueryHookType) => void;
  dateRange: Range;
  setDate: (date: Range) => void;
  onReset: () => void;
}
export const useReviewTable = create<useReviewTableStore>((set) => ({
  hiddenCols: [],
  hiddenRows: [],
  dateRange: {
    startDate: sub(new Date(), { days: 10 }),
    endDate: new Date(),
    key: "selected",
  },
  searchParams: {
    startDate: sub(new Date(), { days: 10 }),
    endDate: new Date(),
    filterType: undefined,
    listing_name: undefined,
    listingId: undefined,
    max: undefined,
    min: undefined,
    page: 1,
    paginate: true,
    search: undefined,
    sort: undefined,
    sortIn: "desc",
    userId: undefined,
  },
  setDate: (date) => set({ dateRange: date }),
  setHiddenCols: (cols) => set({ hiddenCols: cols }),
  setHiddenRows: (rows) => set({ hiddenRows: rows }),
  setQuery: (searchParams) => set({ searchParams }),
  onReset: () =>
    set({
      dateRange: {
        startDate: new Date(),
        endDate: sub(new Date(), { days: 10 }),
        key: "selected",
      },
      hiddenCols: [],
      hiddenRows: [],
      searchParams: {
        startDate: sub(new Date(), { days: 10 }),
        endDate: new Date(),
        filterType: undefined,
        listing_name: undefined,
        listingId: undefined,
        max: undefined,
        min: undefined,
        page: 1,
        paginate: true,
        search: undefined,
        sort: undefined,
        sortIn: "desc",
        userId: undefined,
      },
    }),
}));
