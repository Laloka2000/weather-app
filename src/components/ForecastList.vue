<template>
  <section class="forecast glass" aria-labelledby="forecast-title">
    <h2 id="forecast-title" class="forecast-title">
      <i class="fas fa-calendar-days" aria-hidden="true"></i>
      5-day forecast
    </h2>

    <ol class="forecast-list">
      <li v-for="day in days" :key="day.key" class="forecast-day">
        <span class="day-label">{{ day.label }}</span>
        <img
          :src="iconUrl(day.icon)"
          :alt="day.description"
          class="day-icon"
          width="40"
          height="40"
        />
        <span class="day-min">{{ day.min }}°</span>
        <span class="day-bar" aria-hidden="true">
          <span class="day-bar-fill" :style="barStyle(day)"></span>
        </span>
        <span class="day-max">{{ day.max }}°</span>
      </li>
    </ol>
  </section>
</template>

<script>
import { getDailyForecast } from "@/utils/forecast";
import { getIconUrl } from "@/utils/format";
import { convertTemp } from "@/utils/units";

export default {
  name: "ForecastList",
  props: {
    forecast: {
      type: Object,
      required: true,
    },
    unit: {
      type: String,
      default: "C",
    },
  },
  computed: {
    days() {
      return getDailyForecast(this.forecast).map((day) => ({
        ...day,
        min: convertTemp(day.min, this.unit),
        max: convertTemp(day.max, this.unit),
      }));
    },
    range() {
      return {
        min: Math.min(...this.days.map((day) => day.min)),
        max: Math.max(...this.days.map((day) => day.max)),
      };
    },
  },
  methods: {
    iconUrl(icon) {
      return getIconUrl(icon);
    },
    barStyle(day) {
      const { min, max } = this.range;
      const span = max - min || 1;
      return {
        left: `${((day.min - min) / span) * 100}%`,
        width: `${((day.max - day.min) / span) * 100}%`,
      };
    },
  },
};
</script>

<style scoped>
.forecast {
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-lg);
}

.forecast-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding-bottom: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--glass-border);
}

.forecast-title .fas {
  color: var(--color-accent);
}

.forecast-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.forecast-day {
  display: grid;
  grid-template-columns: 3.5rem 40px 2.5rem 1fr 2.5rem;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) 0;
  font-variant-numeric: tabular-nums;
}

.forecast-day + .forecast-day {
  border-top: 1px solid var(--glass-border);
}

.day-label {
  font-weight: var(--font-weight-medium);
}

.day-min {
  color: var(--color-text-muted);
  text-align: right;
}

.day-max {
  font-weight: var(--font-weight-medium);
}

.day-bar {
  position: relative;
  height: 6px;
  background: color-mix(in srgb, currentColor 20%, transparent);
  border-radius: var(--radius-full);
}

.day-bar-fill {
  position: absolute;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, #6dd5fa, #ffd56b, #ff8a5c);
  border-radius: var(--radius-full);
}
</style>
