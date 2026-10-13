<template>
  <ul class="weather-details">
    <li v-for="item in details" :key="item.label" class="tile">
      <span class="tile-label">
        <i class="fas" :class="item.icon" aria-hidden="true"></i>
        {{ item.label }}
      </span>
      <span class="tile-value">{{ item.value }}</span>
    </li>
  </ul>
</template>

<script>
import { formatLocalTime } from "@/utils/format";
export default {
  name: "WeatherDetails",
  props: {
    weather: {
      type: Object,
      required: true,
    },
  },
  computed: {
    details() {
      const { main, wind, sys, timezone } = this.weather;
      return [
        {
          label: "Feels like",
          value: `${Math.round(main.feels_like)}°C`,
          icon: "fa-temperature-half",
        },
        { label: "Humidity", value: `${main.humidity}%`, icon: "fa-droplet" },
        { label: "Wind", value: `${wind.speed} m/s`, icon: "fa-wind" },
        { label: "Pressure", value: `${main.pressure} hPa`, icon: "fa-gauge" },
        { label: "Sunrise", value: formatLocalTime(sys.sunrise, timezone), icon: "fa-sun" },
        { label: "Sunset", value: formatLocalTime(sys.sunset, timezone), icon: "fa-moon" },
      ];
    },
  },
};
</script>

<style scoped>
.weather-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.tile {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.tile-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tile-label .fas {
  color: var(--color-accent);
}

.tile-value {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  font-variant-numeric: tabular-nums;
}
</style>
