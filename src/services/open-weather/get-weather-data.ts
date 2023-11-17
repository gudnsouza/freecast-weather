import { TUnits } from "@/hooks/useSettingsStore";
import { openWeatherApi } from "./api";

type TWeatherProp = {
  id: number;
  icon: string;
  main: string;
};

type TWeatherResponse = {
  timezone_offset: number;
  timezone: string;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    humidity: number;
    feels_like: number;
    temp: number;
    weather: Array<TWeatherProp>;
  };
  daily: Array<{
    dt: number;
    sunrise: number;
    sunset: number;
    temp: {
      min: number;
      max: number;
    };
    weather: Array<TWeatherProp>;
  }>;
  hourly: Array<{
    temp: number;
    dt: number;
  }>;
};

export const getWeatherData = async ({
  lat,
  lon,
  units,
}: {
  lat: number;
  lon: number;
  units: TUnits;
}) => {
  const { data } = await openWeatherApi.get<TWeatherResponse>("/onecall", {
    params: { lat, lon, exclude: "minutely,alerts", units },
  });

  return data;
};
