import { sub } from "date-fns";
import { Range } from "react-date-range";
import { create } from "zustand";

interface useRangeDateModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  Date: Range;
  setDate: (range: Range) => void;
}

export const useRangeDateModal = create<useRangeDateModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  Date: {
    startDate: sub(new Date(), { days: 10 }),
    endDate: new Date(),
    key: "selected",
  },
  setDate: (date) => set({ Date: date }),
}));
