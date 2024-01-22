import { safeListingType } from "@/types/safeListing";
import { safeReservationType } from "@/types/safeReservation";
import { safeUserType } from "@/types/safeuser";
import { Listing, Reservation } from "@prisma/client";
import { create } from "zustand";

interface useRebookModalStore {
  isOpen: boolean;
  listing?: Listing | safeListingType;
  onClose: () => void;
  onOpen: ({
    listing,
    user,
    reservations,
    reservationId,
  }: {
    listing: Listing | safeListingType;
    reservationId: string;
    user: safeUserType;
    reservations: Reservation[] | safeReservationType[];
  }) => void;
  reservations?: Reservation[] | safeReservationType[];
  user?: safeUserType;
  reservationId?: string;
}

export const useRebookModal = create<useRebookModalStore>((set) => ({
  isOpen: false,
  onClose: () =>
    set({
      isOpen: false,
      listing: undefined,
      reservationId: undefined,
      reservations: undefined,
      user: undefined,
    }),
  onOpen: ({ listing, reservations, user, reservationId }) =>
    set({ isOpen: true, listing, user, reservations, reservationId }),
  listing: undefined,
  reservations: undefined,
  user: undefined,
  reservationId: undefined,
}));
