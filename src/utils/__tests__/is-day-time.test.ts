import { isDayTime, TDayTimeCheckParams } from "../is-day-time";

describe("isDayTime", () => {
  it("should return true when the current time is between sunrise and sunset", () => {
    const params: TDayTimeCheckParams = {
      dt: 1668916800, // 10 AM UTC in UNIX timestamp
      sunrise: 1668913200, // 9 AM UTC
      sunset: 1668956400, // 9 PM UTC
      timezoneOffset: 3600, // +1 hour offset
    };
    expect(isDayTime(params)).toBe(true);
  });

  it("should return false before sunrise", () => {
    const params: TDayTimeCheckParams = {
      dt: 1668909600, // 8 AM UTC
      sunrise: 1668913200, // 9 AM UTC
      sunset: 1668956400, // 9 PM UTC
      timezoneOffset: 3600, // +1 hour offset
    };
    expect(isDayTime(params)).toBe(false);
  });

  it("should return false after sunset", () => {
    const params: TDayTimeCheckParams = {
      dt: 1668960000, // 10 PM UTC
      sunrise: 1668913200, // 9 AM UTC
      sunset: 1668956400, // 9 PM UTC
      timezoneOffset: 3600, // +1 hour offset
    };
    expect(isDayTime(params)).toBe(false);
  });
});
