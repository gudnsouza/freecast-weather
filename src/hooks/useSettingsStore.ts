import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TUnits = "imperial" | "metric" | "standard";

interface SettingsState {
  units: TUnits;
  timeFormat: "AM/PM" | "24h";
  setTimeFormat: (format: "AM/PM" | "24h") => void;
  setUnits: (units: TUnits) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      units: "metric",
      timeFormat: "24h",
      setTimeFormat: (format) => set(() => ({ timeFormat: format })),
      setUnits: (units) => set(() => ({ units: units })),
    }),
    { name: "user-preferences" }
  )
);
