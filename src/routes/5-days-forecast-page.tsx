import ForecastIcon from "@/components/forecast-icon";
import { useCityStore } from "@/hooks/useCityStore";
import { useForecast } from "@/hooks/useForecast";
import { useSettingsStore } from "@/hooks/useSettingsStore";
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

const getWeekday = (date: Date) => {
  return date.toLocaleString("en-us", { weekday: "short" });
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40%;
`;

const FiveDaysForecastPage: React.FC = () => {
  const { data, isLoading } = useForecast();
  const { selectedCity } = useCityStore();
  const { units } = useSettingsStore();
  const tempSuffix =
    units === "metric" ? "C" : units === "standard" ? "K" : "F";

  if (!selectedCity)
    return (
      <Wrapper>
        <h1>Pick a city to see the full forecast</h1>
      </Wrapper>
    );

  if (isLoading)
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    );

  if (!data)
    return (
      <Wrapper>
        <h1>Problem retrieving data</h1>
      </Wrapper>
    );

  return (
    <Wrapper>
      <h1>{selectedCity.name}</h1>
      <Styled5DayForecastContainer>
        {data.daily.slice(0, 5).map((daily) => (
          <StyledContentContainer key={daily.dt}>
            {getWeekday(new Date(daily.dt * 1000))}
            <ForecastIcon condition={daily.weather[0].main} />
            <div>{daily.weather[0].main}</div>
            <div>
              H: {Math.round(daily.temp.max)}&deg;{tempSuffix}/L:{" "}
              {Math.round(daily.temp.min)}
              &deg;
              {tempSuffix}
            </div>
          </StyledContentContainer>
        ))}
      </Styled5DayForecastContainer>
    </Wrapper>
  );
};

export default FiveDaysForecastPage;
