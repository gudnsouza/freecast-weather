import { create } from "zustand";

interface SettingsState {
  units: "Imperial" | "Metric" | "Standard";
  timeFormat: "AM/PM" | "24h";
  setTimeFormat: (format: "AM/PM" | "24h") => void;
  setUnits: (units: "Imperial" | "Metric" | "Standard") => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  units: "Metric",
  timeFormat: "24h",
  setTimeFormat: (format) => set(() => ({ timeFormat: format })),
  setUnits: (units) => set(() => ({ units: units })),
}));
