import ForecastIcon from "@/components/forecast-icon";
import Loading from "@/components/loading";
import VisualizationModeSelector from "@/components/visualization-mode-selector";
import { useCityStore } from "@/hooks/useCityStore";
import { useForecast } from "@/hooks/useForecast";
import { useSettingsStore } from "@/hooks/useSettingsStore";
import { useVisualizationModeStore } from "@/hooks/useVisualizationModeStore";
import React, { Suspense } from "react";
import styled from "styled-components";

const TemperatureChart = React.lazy(() =>
  import("@/components/line-chart").then((module) => ({
    default: module.TemperatureChart,
  }))
);

const StyledCurrentForecastContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40%;
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
  const { visualizationMode } = useVisualizationModeStore();
  const { unitsSuffix } = useSettingsStore();
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
        <Loading />
      </StyledCurrentForecastContainer>
    );

  if (!data)
    return (
      <StyledCurrentForecastContainer>
        <h1>Problem retrieving data</h1>
      </StyledCurrentForecastContainer>
    );

  if (visualizationMode === "chart") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            fontSize: "24px",
          }}
        >
          {selectedCity.name} <VisualizationModeSelector />
        </div>
        <div style={{ width: "100%", maxHeight: "400px", maxWidth: "800px" }}>
          <Suspense fallback={<Loading />}>
            <TemperatureChart data={data.hourly} mode="hours" />
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <StyledCurrentForecastContainer>
      <div>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: "1rem",
            fontSize: "24px",
          }}
        >
          {selectedCity.name} <VisualizationModeSelector />
        </div>

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
            <ForecastIcon
              isDayTime={data.isDayTime}
              condition={data.current.weather[0].main}
            />
            {data.current.weather[0].main}
          </div>
          <div
            style={{
              height: "100%",
              flex: 1,
            }}
          >
            <div>
              Temp: {Math.round(data.current.temp)}&deg;
              {unitsSuffix}
            </div>
            <div>
              Feels Like: {Math.round(data.current.feels_like)}&deg;
              {unitsSuffix}
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
      </div>
    </StyledCurrentForecastContainer>
  );
};

export default CurrentForecastPage;
