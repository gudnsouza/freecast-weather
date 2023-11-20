import { useCityStore } from "@/hooks/useCityStore";
import { useSettingsStore } from "@/hooks/useSettingsStore";
import { getWeatherData } from "@/services/open-weather/get-weather-data";
import { isDayTime } from "@/utils/is-day-time";
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
    select(res) {
      return {
        ...res,
        isDayTime: isDayTime({
          timezoneOffset: res.timezone_offset,
          sunset: res.current.sunset,
          sunrise: res.current.sunrise,
          dt: res.current.dt,
        }),
      };
    },
  });

  return forecastQuery;
}
