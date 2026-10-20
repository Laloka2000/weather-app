<template>
  <div class="weather-app" :class="skyClass">
    <div class="container">
      <header class="app-header">
        <h1 class="app-title">
          <i class="fas fa-cloud-sun" aria-hidden="true"></i>
          Weather
        </h1>
        <div class="header-controls">
          <SearchBar
            class="header-search"
            :loading="loading"
            @search="searchCity"
            @locate="locateUser"
          />
          <UnitToggle v-model="unit" />
        </div>
      </header>

      <main class="app-main">
        <RecentSearches
          v-if="recent.length"
          :cities="recent"
          :loading="loading"
          @select="searchCity"
          @remove="removeCity"
        />
        <Transition name="fade">
          <ErrorMessage v-if="error">{{ error }}</ErrorMessage>
        </Transition>

        <Transition name="fade" mode="out-in">
          <WeatherSkeleton v-if="loading" />
          <div v-else-if="weather" class="weather-layout">
            <CurrentWeather :weather="weather" :unit="unit" />
            <div class="weather-side">
              <WeatherDetails :weather="weather" :unit="unit" />
              <ForecastList v-if="forecast" :forecast="forecast" :unit="unit" />
            </div>
          </div>
          <EmptyState v-else-if="!error" />
        </Transition>
      </main>
    </div>
  </div>
</template>

<script>
import CurrentWeather from "./components/CurrentWeather.vue";
import EmptyState from "./components/EmptyState.vue";
import ErrorMessage from "./components/ErrorMessage.vue";
import ForecastList from "./components/ForecastList.vue";
import SearchBar from "./components/SearchBar.vue";
import WeatherDetails from "./components/WeatherDetails.vue";
import { getCurrentWeather, getForecast } from "./services/weatherApi";
import { getSkyTheme } from "./utils/theme.js";
import { getCurrentPosition } from "./services/geolocation.js";
import UnitToggle from "./components/UnitToggle.vue";
import RecentSearches from "./components/RecentSearches.vue";
import { loadFromStorage, saveToStorage } from "./utils/storage.js";
import { convertTemp, UNITS } from "./utils/units.js";
import WeatherSkeleton from "./components/WeatherSkeleton.vue";

const STORAGE_KEYS = {
  unit: "weather-app:unit",
  recent: "weather-app:recent",
};

const MAX_RECENT = 5;

export default {
  name: "App",
  components: {
    SearchBar,
    CurrentWeather,
    WeatherDetails,
    ErrorMessage,
    EmptyState,
    ForecastList,
    UnitToggle,
    RecentSearches,
    WeatherSkeleton,
  },
  data() {
    const savedUnit = loadFromStorage(STORAGE_KEYS.unit, "C");
    const savedRecent = loadFromStorage(STORAGE_KEYS.recent, []);

    return {
      weather: null,
      forecast: null,
      error: null,
      loading: false,
      unit: UNITS.includes(savedUnit) ? savedUnit : "C",
      recent: Array.isArray(savedRecent) ? savedRecent : [],
    };
  },
  computed: {
    skyClass() {
      return getSkyTheme(this.weather);
    },
    pageTitle() {
      if (!this.weather) return "Weather App";
      const temp = convertTemp(this.weather.main.temp, this.unit);
      return `${temp}°${this.unit} · ${this.weather.name} | Weather App`;
    },
  },
  watch: {
    unit(value) {
      saveToStorage(STORAGE_KEYS.unit, value);
    },
    recent(value) {
      saveToStorage(STORAGE_KEYS.recent, value);
    },
    pageTitle: {
      handler(title) {
        document.title = title;
      },
      immediate: true,
    },
  },
  methods: {
    searchCity(city) {
      if (!city) {
        this.error = "Please enter a city name!";
        return;
      }
      this.loadWeather({ city });
    },

    async locateUser() {
      this.loading = true;
      this.error = null;

      let coords;

      try {
        coords = await getCurrentPosition();
      } catch (err) {
        this.error = err.message;
        this.loading = false;
        return;
      }

      await this.loadWeather(coords);
    },

    rememberCity(name) {
      const others = this.recent.filter((city) => city.toLowerCase() !== name.toLowerCase());
      this.recent = [name, ...others].slice(0, MAX_RECENT);
    },

    removeCity(name) {
      this.recent = this.recent.filter((city) => city !== name);
    },

    async loadWeather(query) {
      this.loading = true;
      this.error = null;

      try {
        const [current, forecast] = await Promise.all([
          getCurrentWeather(query),
          getForecast(query),
        ]);
        this.weather = current;
        this.forecast = forecast;
        this.rememberCity(current.name);
      } catch (err) {
        this.weather = null;
        this.forecast = null;
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

.header-controls {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.header-search {
  flex: 1;
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

.weather-side {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  min-width: 0;
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

  .header-controls {
    flex: 0 1 520px;
  }
}
</style>
