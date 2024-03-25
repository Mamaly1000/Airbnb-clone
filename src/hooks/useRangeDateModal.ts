import { sub } from "date-fns";
import { Range } from "react-date-range";
import { create } from "zustand";

export type rangeModalTypes = "REVIEW" | "RESERVATION" | "ANALYTIC";
interface useRangeDateModalStore {
  isOpen: boolean;
  onOpen: ({ date, type }: { type: rangeModalTypes; date: Range }) => void;
  onClose: () => void;
  type?: rangeModalTypes;
  date: Range;
}

export const useRangeDateModal = create<useRangeDateModalStore>((set) => ({
  isOpen: false,
  type: undefined,
  date: {
    startDate: sub(new Date(), { days: 10 }),
    endDate: new Date(),
    key: "selected",
  },
  onOpen: ({ type, date }) => set({ date, isOpen: true, type }),
  onClose: () => set({ isOpen: false }),
}));
