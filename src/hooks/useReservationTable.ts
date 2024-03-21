import {
  reservationFilterTypes,
  reservationSortTypes,
} from "@/types/reservationTypes";
import { sub } from "date-fns";
import { Range } from "react-date-range";
import { create } from "zustand";

interface useReservationTableStore {
  DisplayDate: Range;
  SelectedFilters: reservationFilterTypes[];
  SelectedSort?: reservationSortTypes;
  hiddenColumns: reservationSortTypes[];
  searchParams?: {
    page?: number;
    min?: number;
    max?: number;
    userId?: string;
    sortType?: "asc" | "desc";
    listingId?: string;
    type?: "COMPLETED" | "PENDING" | "ALL";
  };
  setQuery: (searchParams?: {
    page?: number | undefined;
    min?: number | undefined;
    max?: number | undefined;
    userId?: string | undefined;
    sortType?: "asc" | "desc";
    listingId?: string;
    type?: "COMPLETED" | "PENDING" | "ALL";
  }) => void;
  onResetQuery: () => void;
  setColumns: (hiddenColumns: reservationSortTypes[]) => void;
  setResetColumns: () => void;
  setDate: (date: Range) => void;
  setSelectedSort: (sort: reservationSortTypes | undefined) => void;
  setSelectedFilter: (filters: reservationFilterTypes[]) => void;
}
export const useReservationTable = create<useReservationTableStore>((set) => ({
  SelectedFilters: [],
  SelectedSort: undefined,
  hiddenColumns: [],
  DisplayDate: {
    startDate: sub(new Date(), { days: 10 }),
    endDate: new Date(),
    key: "selected",
  },
  searchParams: {
    userId: undefined,
    max: undefined,
    min: undefined,
    page: 1,
    sortType: "desc",
    type: "ALL",
  },

  onResetQuery: () =>
    set({
      searchParams: {
        userId: undefined,
        max: undefined,
        min: undefined,
        page: 1,
      },
    }),
  setQuery: (searchParams) =>
    set({
      searchParams,
    }),
  setDate: (date) => set({ DisplayDate: date }),
  setColumns: (hiddenColumns) =>
    set({
      hiddenColumns,
    }),
  setResetColumns: () => set({ hiddenColumns: [] }),
  setSelectedSort: (sort) => set({ SelectedSort: sort }),
  setSelectedFilter: (filters) => set({ SelectedFilters: filters }),
}));
