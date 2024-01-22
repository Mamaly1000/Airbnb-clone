import { create } from "zustand";
import { safeReservationType } from "../types/safeReservation";
import { Reservation } from "@prisma/client";

interface useUpdateReservationModalStore {
  onOpen: ({
    id,
    reservations,
  }: {
    id: string;
    reservations: safeReservationType[] | Reservation[];
  }) => void;
  id?: string;
  reservations?: safeReservationType[] | Reservation[];
  onClose: () => void;
}

export const useUpdateReservationModal = create<useUpdateReservationModalStore>(
  (set) => ({
    id: undefined,
    onClose: () => set({ id: undefined }),
    onOpen: ({ id, reservations }) => set({ id, reservations }),
    reservations: undefined,
  })
);
