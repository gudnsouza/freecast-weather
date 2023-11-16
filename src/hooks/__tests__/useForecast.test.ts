import { useCityStore } from "@/hooks/useCityStore";
import { useSettingsStore } from "@/hooks/useSettingsStore";
import { useQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { useForecast } from "../useForecast";

// Mock the hooks and modules
jest.mock("@/services/open-weather/get-weather-data", () => ({
  getWeatherData: jest.fn(),
}));
jest.mock("@/hooks/useSettingsStore");
jest.mock("@/hooks/useCityStore");
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

(useSettingsStore as unknown as jest.Mock).mockReturnValue({ units: "metric" });
(useCityStore as unknown as jest.Mock).mockReturnValue({
  selectedCity: { lat: 0, lon: 0 },
});

describe("useForecast", () => {
  it("calls useQuery with the correct parameters when a city is selected", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    const { result } = renderHook(() => useForecast());

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ["city-forecast", { lat: 0, lon: 0 }, "metric"],
      queryFn: expect.any(Function),
      enabled: true,
    });

    expect(result.current.isLoading).toBe(true);
  });
});
