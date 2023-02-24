/**

Converts time in milliseconds to a string in minutes and seconds format (mm:ss)
@param {number} millis - Time in milliseconds to convert
@returns {string} Time in minutes and seconds format (mm:ss)
*/
export function millisToMinutesAndSeconds(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = Number(((millis % 60000) / 1000).toFixed(0));
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
