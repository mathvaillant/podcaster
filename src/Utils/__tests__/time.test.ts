import { describe, it } from "vitest";
import { millisToHoursMinutesAndSeconds } from "../time";

describe("millisToHoursMinutesAndSeconds", () => {
  it('should convert 1000 milliseconds to "0:00:01"', () => {
    expect(millisToHoursMinutesAndSeconds(1000)).to.equal("0:00:01");
  });

  it('should convert 60000 milliseconds to "0:01:00"', () => {
    expect(millisToHoursMinutesAndSeconds(60000)).to.equal("0:01:00");
  });

  it('should convert 120000 milliseconds to "0:02:00"', () => {
    expect(millisToHoursMinutesAndSeconds(120000)).to.equal("0:02:00");
  });

  it('should convert 60123 milliseconds to "0:01:00"', () => {
    expect(millisToHoursMinutesAndSeconds(60123)).to.equal("0:01:00");
  });

  it('should convert 3600000 milliseconds to "1:00:00"', () => {
    expect(millisToHoursMinutesAndSeconds(3600000)).to.equal("1:00:00");
  });

  it('should convert 3600123 milliseconds to "1:00:00"', () => {
    expect(millisToHoursMinutesAndSeconds(3600123)).to.equal("1:00:00");
  });
});
