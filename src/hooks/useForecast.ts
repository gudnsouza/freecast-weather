import { useCityStore } from "@/hooks/useCityStore";
import { useSettingsStore } from "@/hooks/useSettingsStore";
import { getWeatherData } from "@/services/open-weather/get-weather-data";
import { useQuery } from "@tanstack/react-query";

export function useForecast() {
  const { units } = useSettingsStore();
  const { selectedCity } = useCityStore();

  const forecastQuery = useQuery({
    queryKey: ["city-forecast", selectedCity, units],
    queryFn: () =>
      getWeatherData({
        lat: selectedCity!.lat,
        lon: selectedCity!.lon,
        units: units,
      }),

    enabled: !!selectedCity,
  });

  return forecastQuery;
}
