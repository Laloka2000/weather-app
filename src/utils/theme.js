const conditionGroups = {
  Clear: "clear",
  Clouds: "clouds",
  Rain: "rain",
  Drizzle: "rain",
  Thunderstorm: "thunderstorm",
  Snow: "snow",
};

export function getSkyTheme(weather) {
  if (!weather) return "sky--default";

  const { main, icon } = weather.weather[0];
  const group = conditionGroups[main] || "mist";
  const time = icon.endsWith("n") ? "night" : "day";

  return `sky--${group}-${time}`;
}
