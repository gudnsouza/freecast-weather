import { getWeekday } from "../get-weekday";

describe("getWeekday", () => {
  it("should return the correct short weekday for a given date with timezone", () => {
    const date = new Date("2023-11-17T00:00:00-05:00");
    const weekday = getWeekday(date);
    expect(weekday).toBe("Fri");
  });
});
