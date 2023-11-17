import ForecastIcon from "@/components/forecast-icon";
import { TemperatureChart } from "@/components/line-chart";
import Loading from "@/components/loading";
import VisualizationModeSelector from "@/components/visualization-mode-selector";
import { useCityStore } from "@/hooks/useCityStore";
import { useForecast } from "@/hooks/useForecast";
import { useSettingsStore } from "@/hooks/useSettingsStore";
import { useVisualizationModeStore } from "@/hooks/useVisualizationModeStore";
import { getWeekday } from "@/utils/get-weekday";
import styled from "styled-components";

const Styled5DayForecastContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40%;
`;

const FiveDaysForecastPage: React.FC = () => {
  const { data, isLoading } = useForecast();
  const { visualizationMode } = useVisualizationModeStore();

  const chartData = data?.daily.map((day) => ({ dt: day.dt, ...day.temp }));
  const { selectedCity } = useCityStore();
  const { unitsSuffix } = useSettingsStore();

  if (!selectedCity)
    return (
      <Wrapper>
        <h1>Pick a city to see the full forecast</h1>
      </Wrapper>
    );

  if (isLoading)
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );

  if (!data)
    return (
      <Wrapper>
        <h1>Problem retrieving data</h1>
      </Wrapper>
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
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <TemperatureChart mode="days" data={chartData!} />
        </div>
      </div>
    );
  }

  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          fontSize: "24px",
        }}
      >
        {selectedCity.name}
        <VisualizationModeSelector />
      </div>
      <Styled5DayForecastContainer>
        {data.daily.slice(0, 5).map((daily) => (
          <StyledContentContainer key={daily.dt}>
            {getWeekday(new Date(daily.dt * 1000))}
            <ForecastIcon condition={daily.weather[0].main} />
            <div>{daily.weather[0].main}</div>
            <div>
              H: {Math.round(daily.temp.max)}&deg;{unitsSuffix}/L:{" "}
              {Math.round(daily.temp.min)}
              &deg;
              {unitsSuffix}
            </div>
          </StyledContentContainer>
        ))}
      </Styled5DayForecastContainer>
    </Wrapper>
  );
};

export default FiveDaysForecastPage;
