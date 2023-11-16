import { useCityStore } from "@/hooks/useCityStore";
import { useForecast } from "@/hooks/useForecast";
import styled from "styled-components";

const StyledCurrentForecastContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CurrentForecast: React.FC = () => {
  const { selectedCity } = useCityStore();
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
    <StyledCurrentForecastContainer>forecast</StyledCurrentForecastContainer>
  );
};

export default CurrentForecast;
