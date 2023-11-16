import { useCityStore } from "@/hooks/useCityStore";
import { useSettingsStore } from "@/hooks/useSettingsStore";
import { getWeatherData } from "@/services/open-weather/get-weather-data";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

const StyledCurrentForecastContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CurrentForecast: React.FC = () => {
  const { units } = useSettingsStore();
  const { selectedCity } = useCityStore();

  const { data, isLoading } = useQuery({
    queryKey: ["city-forecast", selectedCity, units],
    queryFn: () =>
      getWeatherData({
        units,
        lat: selectedCity!.lat,
        lon: selectedCity!.lon,
      }),
    enabled: !!selectedCity,
  });

  if (!selectedCity)
    return (
      <StyledCurrentForecastContainer>
        <h1>Pick a city to see the full forecast</h1>
      </StyledCurrentForecastContainer>
    );

  if (isLoading)
    return (
      <StyledCurrentForecastContainer>
        <h1>Loading...</h1>
      </StyledCurrentForecastContainer>
    );

  if (!data)
    return (
      <StyledCurrentForecastContainer>
        <h1>Problem retrieving data</h1>
      </StyledCurrentForecastContainer>
    );
  return (
    <StyledCurrentForecastContainer>forecast</StyledCurrentForecastContainer>
  );
};

export default CurrentForecast;
