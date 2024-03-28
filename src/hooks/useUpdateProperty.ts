import { create } from "zustand";
import { listingQueryHookType } from "./useListings";

interface useUpdatePropertyStore {
  id?: string;
  onOpen: (id: string, params?: listingQueryHookType) => void;
  onClose: () => void;
  params?: listingQueryHookType;
}

export const useUpdateProperty = create<useUpdatePropertyStore>((set) => ({
  id: undefined,
  onClose: () => set({ id: undefined }),
  onOpen: (id) => set({ id }),
  params: undefined,
}));
