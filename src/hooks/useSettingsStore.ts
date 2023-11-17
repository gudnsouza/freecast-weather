import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TUnits = "imperial" | "metric" | "standard";

interface SettingsState {
  units: TUnits;
  timeFormat: "AM/PM" | "24h";
  unitsSuffix: "K" | "C" | "F";
  setTimeFormat: (format: "AM/PM" | "24h") => void;
  setUnits: (units: TUnits) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      units: "metric",
      unitsSuffix: "C",
      timeFormat: "24h",
      setTimeFormat: (format) => set(() => ({ timeFormat: format })),
      setUnits: (units) => {
        let suffix: "K" | "C" | "F";
        switch (units) {
          case "metric":
            suffix = "C";
            break;
          case "imperial":
            suffix = "F";
            break;
          case "standard":
            suffix = "K";
            break;
          default:
            suffix = "C";
        }
        set({ units, unitsSuffix: suffix });
      },
    }),
    { name: "user-preferences" }
  )
);
