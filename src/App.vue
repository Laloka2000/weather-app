<template>
  <div class="weather-app" :class="weatherClass">
    <main class="card"> 
      <h1 class="app-title">Weather App 🌤</h1>

      <SearchBar :loading="loading" @search="fetchWeather"/>

      <template v-if="weather">
        <CurrentWeather :weather="weather"/>
        <WeatherDetails :weather="weather"/>
      </template>

      <ErrorMessage v-if="error">{{ error }}</ErrorMessage>
    </main>
  </div>
</template>

<script>
import CurrentWeather from './components/CurrentWeather.vue';
import ErrorMessage from './components/ErrorMessage.vue';
import SearchBar from './components/SearchBar.vue';
import WeatherDetails from './components/WeatherDetails.vue';
import { getCurrentWeather } from './services/weatherApi';

export default {
  name: "App",
  components: {
    SearchBar,
    CurrentWeather,
    WeatherDetails,
    ErrorMessage,
  },
  data()
  {
    return {
      weather: null,
      error: null,
      loading: false,
    };
  },
  computed: {
    weatherClass()
    {
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
/* General Styles */
.weather-app {
  min-height: 100vh;
  transition: background 0.6s ease;
  padding: 20px;
  text-align: center;
}

.card {
  max-width: 500px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.weather--default {
  background: #f0f8ff;
}

.weather--clear {
  background: #87ceeb;
}

.weather--clouds {
  background: #d3d3d3;
}

.weather--rain,
.weather--drizzle {
  background: #a9a9a9;
}

.weather--snow {
  background: #eef6fb;
}

.weather--thunderstorm {
  background: #5b5470;
}

.app-title {
  font-size: 2em;
  color: #2c3e50;
  margin-bottom: 20px;
}
</style>
