<template>
  <section class="current-weather glass">
    <h2 class="location">
      <i class="fas fa-location-dot" aria-hidden="true"></i>
      {{ weather.name }}, {{ weather.sys.country }}
    </h2>
    <p class="local-time">{{ localTime }}</p>

    <div class="temp-row">
      <img :src="iconUrl" :alt="description" class="weather-icon" width="100" height="100" />
      <p class="temperature">
        {{ temperature }}<span class="unit">°{{ unit }}</span>
      </p>
    </div>

    <p class="description">{{ description }}</p>
    <p class="range">
      <span>H: {{ max }}°</span>
      <span>L: {{ min }}°</span>
    </p>
  </section>
</template>

<script>
import { formatLocalTime, getIconUrl } from "@/utils/format";
import { convertTemp } from "@/utils/units";

export default {
  name: "CurrentWeather",
  props: {
    weather: {
      type: Object,
      required: true,
    },
    unit: {
      type: String,
      default: "C",
    },
  },
  computed: {
    temperature() {
      return convertTemp(this.weather.main.temp, this.unit);
    },
    max() {
      return convertTemp(this.weather.main.temp_max, this.unit);
    },
    min() {
      return convertTemp(this.weather.main.temp_min, this.unit);
    },
    description() {
      return this.weather.weather[0].description;
    },
    iconUrl() {
      return getIconUrl(this.weather.weather[0].icon);
    },
    localTime() {
      return formatLocalTime(this.weather.dt, this.weather.timezone, {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
.current-weather {
  padding: var(--space-6);
  text-align: center;
  border-radius: var(--radius-xl);
}

.location {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-heading);
}

.location .fas {
  color: var(--color-accent);
}

.local-time {
  margin-top: var(--space-1);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.temp-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--space-4);
}

.weather-icon {
  width: 100px;
  height: 100px;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.15));
}

.temperature {
  display: flex;
  align-items: flex-start;
  font-size: var(--font-size-hero);
  font-weight: var(--font-weight-light);
  line-height: 1;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
}

.unit {
  margin-top: 0.15em;
  font-size: 0.35em;
  letter-spacing: 0;
}

.description {
  margin-top: var(--space-2);
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  text-transform: capitalize;
}

.range {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  margin-top: var(--space-2);
  font-weight: var(--font-weight-medium);
}
</style>
