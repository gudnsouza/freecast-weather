export type TDayTimeCheckParams = {
  dt: number;
  sunrise: number;
  sunset: number;
  timezoneOffset: number;
};

export const isDayTime = ({
  dt,
  sunrise,
  sunset,
  timezoneOffset,
}: TDayTimeCheckParams) => {
  const localCurrentTime = dt + timezoneOffset;
  const localSunriseTime = sunrise + timezoneOffset;
  const localSunsetTime = sunset + timezoneOffset;

  return (
    localCurrentTime >= localSunriseTime && localCurrentTime < localSunsetTime
  );
};
