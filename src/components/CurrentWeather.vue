<template>
  <section class="current-weather">
    <h2 class="location">
      <i class="fas fa-location-dot"></i> {{ weather.name }}, {{ weather.sys.country }}
    </h2>
    <p class="temperature">{{ temperature }}°C</p>
    <p class="description">{{ weather.weather[0].description }}</p>
  </section>
</template>

<script>
export default {
  name: "CurrentWeather",
  props: {
    weather: {
      type: Object,
      required: true,
    },
  },
  computed: {
    temperature() {
      return Math.round(this.weather.main.temp);
    },
  },
};
</script>

<style scoped>
.current-weather {
  margin-top: var(--space-5);
}

.location {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  color: var(--color-heading);
}

.location .fas {
  color: var(--color-accent);
  margin-right: var(--space-1);
}

.temperature {
  font-size: var(--font-size-display);
  font-weight: var(--font-weight-light);
  line-height: 1.1;
  margin-top: var(--space-2);
  font-variant-numeric: tabular-nums;
}

.description {
  color: var(--color-text-muted);
  text-transform: capitalize;
}
</style>
