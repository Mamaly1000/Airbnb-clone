import { create } from "zustand";

interface useReservationRangeDateModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useReservationRangeDateModal =
  create<useReservationRangeDateModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
