function toLocalDate(unixSeconds, timezoneOffset) {
  return new Date((unixSeconds + timezoneOffset) * 1000);
}

function localHour(item, timezoneOffset) {
  return toLocalDate(item.dt, timezoneOffset).getUTCHours();
}

function pickMidday(items, timezoneOffset) {
  return items.reduce((best, item) => {
    const bestDistance = Math.abs(localHour(best, timezoneOffset) - 12);
    const itemDistance = Math.abs(localHour(item, timezoneOffset) - 12);
    return itemDistance < bestDistance ? item : best;
  });
}

export function getDailyForecast(forecast) {
  const { list, city } = forecast;
  const days = new Map();

  for (const item of list) {
    const key = toLocalDate(item.dt, city.timezone).toISOString().slice(0, 10);
    if (!days.has(key)) days.set(key, []);
    days.get(key).push(item);
  }

  return Array.from(days.entries())
    .slice(0, 5)
    .map(([key, items], index) => {
      const midday = pickMidday(items, city.timezone);
      const weekday = new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        timeZone: "UTC",
      }).format(toLocalDate(items[0].dt, city.timezone));

      return {
        key,
        label: index === 0 ? "Today" : weekday,
        min: Math.min(...items.map((item) => item.main.temp_min)),
        max: Math.max(...items.map((item) => item.main.temp_max)),
        icon: midday.weather[0].icon,
        description: midday.weather[0].description,
      };
    });
}
