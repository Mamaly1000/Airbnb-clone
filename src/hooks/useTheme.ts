"use client";
import { create } from "zustand";

interface useThemeStore {
  mode: "dark" | "light";
  setTheme: (val?: "dark" | "light" | null | unknown) => void;
}
export const useTheme = create<useThemeStore>((set) => ({
  mode:
    // (window !== undefined &&
    //   window.localStorage !== undefined &&
    //   (localStorage?.getItem("airbnb_theme_mode") as any)) ||
    // "dark",
    "dark",
  setTheme: (val) => {
    if (!!!val) {
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
    } else {
      if (val === "dark" || val === "light") set({ mode: val });
    }
  },
}));
