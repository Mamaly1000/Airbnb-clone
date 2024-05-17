import { create } from "zustand";

interface useExploreLocationStore {
  location?: string;
  setLocation: (location: string) => void;
}
export const useExploreLocation = create<useExploreLocationStore>((set) => ({
  setLocation: (l) => set({ location: l }),
  location: undefined,
}));
