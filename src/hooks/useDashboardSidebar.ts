"use client";
import { create } from "zustand";

interface useDashboardSidebarStore {
  isOpen: boolean;
  isCollapse: boolean;
  onOpen: () => void;
  onCollapse: () => void;
  onClose: () => void;
  onExpand: () => void;
}

const useDashboardSidebar = create<useDashboardSidebarStore>((set) => ({
  isCollapse: false,
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  onCollapse: () => set({ isCollapse: true }),
  onExpand: () => set({ isCollapse: false }),
}));

export default useDashboardSidebar;
