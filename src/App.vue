<template>
  <div class="weather-app" :class="skyClass">
    <div class="container">
      <header class="app-header">
        <h1 class="app-title">
          <i class="fas fa-cloud-sun" aria-hidden="true"></i>
          Weather
        </h1>
        <SearchBar :loading="loading" @search="fetchWeather" />
      </header>

      <main class="app-main">
        <ErrorMessage v-if="error">{{ error }}</ErrorMessage>
        <div v-if="weather" class="weather-layout">
          <CurrentWeather :weather="weather" />
          <WeatherDetails :weather="weather" />
        </div>

        <EmptyState v-else-if="!error" />
      </main>
    </div>
  </div>
</template>

<script>
import CurrentWeather from "./components/CurrentWeather.vue";
import EmptyState from "./components/EmptyState.vue";
import ErrorMessage from "./components/ErrorMessage.vue";
import SearchBar from "./components/SearchBar.vue";
import WeatherDetails from "./components/WeatherDetails.vue";
import { getCurrentWeather } from "./services/weatherApi";
import { getSkyTheme } from "./utils/theme.js";

export default {
  name: "App",
  components: {
    SearchBar,
    CurrentWeather,
    WeatherDetails,
    ErrorMessage,
    EmptyState,
  },
  data() {
    return {
      weather: null,
      error: null,
      loading: false,
    };
  },
  computed: {
    skyClass() {
      return getSkyTheme(this.weather);
    },
  },
  methods: {
    async fetchWeather(city) {
      if (!city) {
        this.error = "Please enter a city name!";
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        this.weather = await getCurrentWeather(city);
      } catch (err) {
        this.weather = null;
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.weather-app {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  min-height: 100vh;
  padding: var(--space-6) var(--space-4);
  color: var(--color-text);
  background: linear-gradient(180deg, var(--sky-top), var(--sky-bottom));
  transition:
    --sky-top var(--transition-sky),
    --sky-bottom var(--transition-sky),
    --sky-glow var(--transition-sky);
}

.weather-app::before {
  content: "";
  position: absolute;
  top: -20vmax;
  right: -15vmax;
  z-index: -1;
  width: 60vmax;
  height: 60vmax;
  border-radius: 50%;
  background: radial-gradient(circle, var(--sky-glow), transparent 65%);
  pointer-events: none;
}

.container {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  max-width: var(--container-width);
  margin: 0 auto;
}

.app-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.app-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-heading);
}

.app-title .fas {
  color: var(--color-accent);
}

.app-main {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.weather-layout {
  display: grid;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .weather-app {
    padding: var(--space-8) var(--space-6);
  }

  .app-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .weather-layout {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    align-items: start;
  }
}
</style>
