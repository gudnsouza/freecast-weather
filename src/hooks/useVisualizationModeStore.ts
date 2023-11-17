import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TVisualizationMode = "icon" | "chart";

export type TVisualizationModeState = {
  visualizationMode: TVisualizationMode;
  setVisualizationMode: (visualizationMode: TVisualizationMode) => void;
};

export const useVisualizationModeStore = create<TVisualizationModeState>()(
  persist(
    (set) => ({
      visualizationMode: "icon",
      setVisualizationMode: (visualizationMode) =>
        set(() => ({ visualizationMode })),
    }),
    { name: "visualization-mode" }
  )
);
