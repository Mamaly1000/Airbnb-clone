import React from "react";
import { create } from "zustand";

interface useFeedbackModalStore {
  isOpen: boolean;
  reservationId?: string;
  listingId?: string;
  onClose: () => void;
  onOpen: ({
    reservationId,
    listingId,
  }: {
    reservationId: string;
    listingId: string;
  }) => void;
}

export const useFeedbackModal = create<useFeedbackModalStore>((set) => ({
  reservationId: undefined,
  listingId: undefined,
  isOpen: false,
  onClose: () =>
    set({ isOpen: false, reservationId: undefined, listingId: undefined }),
  onOpen: ({ reservationId, listingId }) =>
    set({ isOpen: true, reservationId, listingId }),
}));
