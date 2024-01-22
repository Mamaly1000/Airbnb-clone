import { create } from "zustand";

interface useUpdatePropertyStore {
  id?: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useUpdateProperty = create<useUpdatePropertyStore>((set) => ({
  id: undefined,
  onClose: () => set({ id: undefined }),
  onOpen: (id) => set({ id }),
}));
