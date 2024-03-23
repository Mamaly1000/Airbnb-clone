"use client";

import { create } from "zustand";

interface useReviewFilterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useReviewFilterModal = create<useReviewFilterModalStore>(
  (set) => ({
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
    isOpen: false,
  })
);
