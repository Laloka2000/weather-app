export function formatLocalTime(
  unixSeconds,
  timezoneOffset,
  options = { hour: "2-digit", minute: "2-digit" },
) {
  const date = new Date((unixSeconds + timezoneOffset) * 1000);
  return new Intl.DateTimeFormat("en-GB", { ...options, timeZone: "UTC" }).format(date);
}

export function getIconUrl(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
