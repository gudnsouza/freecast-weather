import Unknown from "@/assets/weather-icons/unknown.svg";
import Sun from "@/assets/weather-icons/weather-clear.svg";
import Clouds from "@/assets/weather-icons/weather-cloudy.svg";
import Fog from "@/assets/weather-icons/weather-fog.svg";
import Haze from "@/assets/weather-icons/weather-hail.svg";
import Thunderstorm from "@/assets/weather-icons/weather-lightning-rainy.svg";
import Moon from "@/assets/weather-icons/weather-night.svg";
import Pouring from "@/assets/weather-icons/weather-pouring.svg";
import Snow from "@/assets/weather-icons/weather-snowy.svg";
import useThemeStore from "@/hooks/useThemeStore";
import styled from "styled-components";

type WeatherIconContainerProps = {
  $colorFill?: string;
};

export const WeatherIconContainer = styled.div<WeatherIconContainerProps>`
  & > svg {
    fill: ${(props) => props.$colorFill || props.theme.accent};
    width: 7rem;
    height: 7rem;
  }
`;

const ForecastIcon: React.FC<{ condition: string; isDayTime: boolean }> = ({
  condition,
  isDayTime,
}) => {
  const { theme } = useThemeStore();
  console.log({ theme });
  if (condition === "Clear")
    return (
      <WeatherIconContainer
        $colorFill={isDayTime ? theme.yellow : theme.purple}
      >
        {isDayTime ? <Sun /> : <Moon />}
      </WeatherIconContainer>
    );
  if (condition === "Clouds")
    return (
      <WeatherIconContainer>
        <Clouds />
      </WeatherIconContainer>
    );
  if (condition === "Rain")
    return (
      <WeatherIconContainer>
        <Pouring />
      </WeatherIconContainer>
    );
  if (condition === "Thunderstorm")
    return (
      <WeatherIconContainer>
        <Thunderstorm />
      </WeatherIconContainer>
    );
  if (condition === "Snow")
    return (
      <WeatherIconContainer>
        <Snow />
      </WeatherIconContainer>
    );
  if (condition === "Mist")
    return (
      <WeatherIconContainer>
        <Fog />
      </WeatherIconContainer>
    );

  if (condition === "Haze")
    return (
      <WeatherIconContainer>
        <Haze />
      </WeatherIconContainer>
    );

  return (
    <WeatherIconContainer>
      <Unknown />
    </WeatherIconContainer>
  );
};

export default ForecastIcon;
