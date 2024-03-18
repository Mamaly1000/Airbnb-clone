import { create } from "zustand";

interface useSelectedNotifDropDownStore {
  id?: string;
  onSelect: (id: string) => void;
  onDeselect: () => void;
}
export const useSelectedNotifDropDown = create<useSelectedNotifDropDownStore>(
  (set) => ({
    onDeselect: () => set({ id: undefined }),
    id: undefined,
    onSelect: (id) => set({ id }),
  })
);
