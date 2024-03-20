import { create } from "zustand";

interface useReservationFilterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useReservationFilterModal = create<useReservationFilterModalStore>(
  (set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
  })
);
