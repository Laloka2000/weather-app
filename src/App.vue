<template>
  <div class="weather-app" :class="weatherClass">
    <main class="card">
      <h1 class="app-title">Weather App 🌤</h1>

      <SearchBar :loading="loading" @search="fetchWeather" />

      <template v-if="weather">
        <CurrentWeather :weather="weather" />
        <WeatherDetails :weather="weather" />
      </template>

      <ErrorMessage v-if="error">{{ error }}</ErrorMessage>
    </main>
  </div>
</template>

<script>
import CurrentWeather from "./components/CurrentWeather.vue";
import ErrorMessage from "./components/ErrorMessage.vue";
import SearchBar from "./components/SearchBar.vue";
import WeatherDetails from "./components/WeatherDetails.vue";
import { getCurrentWeather } from "./services/weatherApi";

export default {
  name: "App",
  components: {
    SearchBar,
    CurrentWeather,
    WeatherDetails,
    ErrorMessage,
  },
  data() {
    return {
      weather: null,
      error: null,
      loading: false,
    };
  },
  computed: {
    weatherClass() {
      if (!this.weather) return "weather--default";
      return `weather--${this.weather.weather[0].main.toLowerCase()}`;
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
  min-height: 100vh;
  padding: var(--space-5);
  text-align: center;
  background: var(--sky-default);
  transition: background var(--transition-slow);
}

.card {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: var(--space-6);
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.app-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-heading);
  margin-bottom: var(--space-5);
}

.weather--clear {
  background: var(--sky-clear);
}

.weather--clouds {
  background: var(--sky-clouds);
}

.weather--rain,
.weather--drizzle {
  background: var(--sky-rain);
}

.weather--snow {
  background: var(--sky-snow);
}

.weather--thunderstorm {
  background: var(--sky-thunderstorm);
}

.weather--mist,
.weather--fog,
.weather--haze,
.weather--smoke,
.weather--dust {
  background: var(--sky-mist);
}
</style>
