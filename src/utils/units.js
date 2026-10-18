export const UNITS = ["C", "F"];

export function convertTemp(celsius, unit) {
  const value = unit === "F" ? (celsius * 9) / 5 + 32 : celsius;
  return Math.round(value);
}

export function formatWind(metersPerSecond, unit) {
  if (unit === "F") return `${(metersPerSecond * 2.237).toFixed(1)} mph`;
  return `${metersPerSecond.toFixed(1)} m/s`;
}
