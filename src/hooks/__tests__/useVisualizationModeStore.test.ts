import { act, renderHook } from "@testing-library/react";
import { StateCreator } from "zustand";
import {
  TVisualizationModeState,
  useVisualizationModeStore,
} from "../useVisualizationModeStore";

jest.mock("zustand/middleware", () => ({
  persist: (config: StateCreator<TVisualizationModeState>) => config,
}));

describe("useVisualizationModeStore", () => {
  it('should use "icon" as the default visualization mode', () => {
    const { result } = renderHook(() => useVisualizationModeStore());
    expect(result.current.visualizationMode).toBe("icon");
  });

  it('should allow changing the visualization mode to "chart"', () => {
    const { result } = renderHook(() => useVisualizationModeStore());
    act(() => {
      result.current.setVisualizationMode("chart");
    });
    expect(result.current.visualizationMode).toBe("chart");
  });
});
