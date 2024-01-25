import { safeListingType } from "@/types/safeListing";
import { Listing } from "@prisma/client";
import { create } from "zustand";

interface useListingPreviewStore {
  id?: string;
  onOpen: ({ id }: { id: string }) => void;
  onClose: () => void;
}

export const useListingPreview = create<useListingPreviewStore>((set) => ({
  id: undefined,
  listing: undefined,
  onClose: () => set({ id: undefined }),
  onOpen: ({ id }) => set({ id }),
}));
