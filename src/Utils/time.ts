/**
 * Converts the given time in milliseconds to hours, minutes, and seconds.
 * @param {number} millis - The time to convert, in milliseconds.
 * @returns {string} A string in the format 'hh:mm:ss', where hh is the number of hours, mm is the number of minutes, and ss is the number of seconds.
 */
export function millisToHoursMinutesAndSeconds(millis: number) {
  const hours = Math.floor(millis / 3600000);
  const minutes = Math.floor((millis % 3600000) / 60000);
  const seconds = Number(((millis % 60000) / 1000).toFixed(0));
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

