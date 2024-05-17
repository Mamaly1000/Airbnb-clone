import { create } from "zustand";
import {
  NotificationFilterTypes,
  NotificationSortTypes,
} from "./useNotifications";

interface params {
  search?: string;
  filter?: NotificationFilterTypes;
  sort?: NotificationSortTypes;
}

interface useNotificationSearchStore {
  params: params;
  setParams: (params: params) => void;
}

export const useNotificationSearch = create<useNotificationSearchStore>(
  (set) => ({
    params: { filter: undefined, search: "", sort: undefined },
    setParams: (params) => set({ params }),
  })
);
