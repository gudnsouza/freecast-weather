import type { TCity } from "@/constants/cities";
import { act, renderHook } from "@testing-library/react";
import { useCityStore } from "../useCityStore";

const mockCity: TCity = {
  name: "Test City",
  lat: 0,
  lon: 0,
};

describe("useCityStore hook", () => {
  it("should start with no selected city", () => {
    const { result } = renderHook(() => useCityStore());
    expect(result.current.selectedCity).toBeUndefined();
  });

  it("should allow selecting a city", () => {
    const { result } = renderHook(() => useCityStore());

    act(() => {
      result.current.selectCity(mockCity);
    });

    expect(result.current.selectedCity).toEqual(mockCity);
  });
});
