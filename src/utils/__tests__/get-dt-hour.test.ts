import { getDtHour } from "../get-dt-hour";

describe("getDtHour", () => {
  it("should return the correct hour and minute in 24-hour format", () => {
    const date = new Date("2023-11-17T15:45:00");
    const time = getDtHour(date, true);
    expect(time).toBe("15:45");
  });
  it("should return the correct hour and minute in 12-hour format", () => {
    const date = new Date("2023-11-17T15:45:00");
    const time = getDtHour(date, false);
    expect(time).toBe("03:45 PM");
  });
});
