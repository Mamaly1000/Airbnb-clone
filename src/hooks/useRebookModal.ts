import { create } from "zustand";

interface useRebookModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: ({
    reservationId,
    listingId,
  }: {
    reservationId: string;
    listingId: string;
  }) => void;
  reservationId?: string;
  listingId?: string;
}

export const useRebookModal = create<useRebookModalStore>((set) => ({
  isOpen: false,
  onClose: () =>
    set({
      isOpen: false,
      reservationId: undefined,
      listingId: undefined,
    }),
  onOpen: ({ reservationId, listingId }) =>
    set({ isOpen: true, listingId, reservationId }),
  listingId: undefined,
  reservationId: undefined,
}));
