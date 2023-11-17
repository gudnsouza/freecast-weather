import { TUnits } from "@/hooks/useSettingsStore";
import { openWeatherApi } from "./api";
import { getWeatherData } from "./get-weather-data";

jest.mock("./api", () => ({
  openWeatherApi: {
    get: jest.fn(),
  },
}));

describe("getWeatherData function", () => {
  const mockWeatherResponse = {
    timezone_offset: 3600,
    timezone: "Europe/London",
    current: {
      dt: 1618317040,
      sunrise: 1618282134,
      sunset: 1618333901,
      humidity: 30,
      feels_like: 284.15,
      temp: "15.07",
      weather: [
        {
          id: 800,
          icon: "01d",
          main: "Clear",
        },
      ],
    },
    daily: [
      {
        dt: 1618304000,
        sunrise: 1618282134,
        sunset: 1618333901,
        temp: {
          min: 282.55,
          max: 284.15,
        },
        weather: [
          {
            id: 800,
            icon: "01d",
            main: "Clear",
          },
        ],
      },
    ],
  };

  it("fetches weather data successfully", async () => {
    (openWeatherApi.get as jest.Mock).mockResolvedValue({
      data: mockWeatherResponse,
    });

    const units: TUnits = "metric";
    const data = await getWeatherData({ lat: 51.5074, lon: -0.1278, units });

    expect(openWeatherApi.get).toHaveBeenCalledWith("/onecall", {
      params: {
        lat: 51.5074,
        lon: -0.1278,
        exclude: "minutely,alerts",
        units,
      },
    });

    expect(data).toEqual(mockWeatherResponse);
  });
});
