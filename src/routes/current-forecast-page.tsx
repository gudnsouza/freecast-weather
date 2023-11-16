import ForecastIcon from "@/components/forecast-icon";
import { useCityStore } from "@/hooks/useCityStore";
import { useForecast } from "@/hooks/useForecast";
import { useSettingsStore } from "@/hooks/useSettingsStore";
import styled from "styled-components";

const StyledCurrentForecastContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimeDisplay: React.FC<{ timestamp: number; timezone: string }> = ({
  timestamp,
  timezone,
}) => {
  const date = new Date(timestamp * 1000);
  const { timeFormat } = useSettingsStore();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone,
      hour12: timeFormat === "24h" ? false : true,
    });
  };

  return <>{formatTime(date)}</>;
};

const CurrentForecastPage: React.FC = () => {
  const { selectedCity } = useCityStore();
  const { units } = useSettingsStore();
  const tempSuffix =
    units === "metric" ? "C" : units === "standard" ? "K" : "F";
  const { data, isLoading } = useForecast();

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
    <StyledCurrentForecastContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "24px",
          }}
        >
          {selectedCity.name}
          <ForecastIcon condition={data.current.weather[0].main} />
          {data.current.weather[0].main}
        </div>
        <div>
          <div>
            Temp: {Math.round(data.current.temp)}&deg;
            {tempSuffix}
          </div>
          <div>
            Feels Like: {Math.round(data.current.feels_like)}&deg;
            {tempSuffix}
          </div>
          <div>Humidity: {data.current.humidity}%</div>
          <div>
            Sunrise:{" "}
            <TimeDisplay
              timestamp={data.current.sunrise}
              timezone={data.timezone}
            />
          </div>
          <div>
            Sunset:{" "}
            <TimeDisplay
              timestamp={data.current.sunset}
              timezone={data.timezone}
            />
          </div>
        </div>
      </div>
    </StyledCurrentForecastContainer>
  );
};

export default CurrentForecastPage;
