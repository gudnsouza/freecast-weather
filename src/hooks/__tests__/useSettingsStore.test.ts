import { act, renderHook } from "@testing-library/react";
import { useSettingsStore } from "../useSettingsStore";

describe("useSettingsStore hook", () => {
  it("should start with default settings", () => {
    const { result } = renderHook(() => useSettingsStore());
    expect(result.current.units).toBe("metric");
    expect(result.current.timeFormat).toBe("24h");
  });

  it("should allow changing time format", () => {
    const { result } = renderHook(() => useSettingsStore());

    act(() => {
      result.current.setTimeFormat("AM/PM");
    });

    expect(result.current.timeFormat).toBe("AM/PM");
  });

  it("should allow changing units", () => {
    const { result } = renderHook(() => useSettingsStore());

    act(() => {
      result.current.setUnits("imperial");
    });

    expect(result.current.units).toBe("imperial");
  });
});
