"use client";
import { create } from "zustand";

interface useThemeStore {
  mode: "dark" | "light";
  setTheme: () => void;
}
export const useTheme = create<useThemeStore>((set) => ({
  mode:
    // (window !== undefined &&
    //   window.localStorage !== undefined &&
    //   (localStorage?.getItem("airbnb_theme_mode") as any)) ||
    // "dark",
    "dark",
  setTheme: () => {
    if (
      localStorage.getItem("airbnb_theme_mode") === null ||
      localStorage.getItem("airbnb_theme_mode") === "dark"
    ) {
      set({ mode: "light" });
      localStorage.setItem("airbnb_theme_mode", "light");
    } else {
      localStorage.setItem("airbnb_theme_mode", "dark");
      set({ mode: "dark" });
    }
  },
}));
