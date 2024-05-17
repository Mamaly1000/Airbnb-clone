import { create } from "zustand";
import { listingQueryHookType } from "./useListings";

type params = listingQueryHookType;

interface usePropertySearchStore {
  params?: params;
  setParams: (params: params) => void;
}
export const usePropertySearch = create<usePropertySearchStore>((set) => ({
  params: undefined,
  setParams: (params) => set({ params }),
}));
