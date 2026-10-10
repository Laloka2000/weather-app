<template>
  <div class="weather-app" :class="weatherClass">
    <main class="card">
      <h1 class="app-title">Weather App 🌤</h1>
  
      <div class="search-container">
        <input v-model="city" @keyup.enter="fetchWeather" placeholder="Enter city name" class="city-input" />
        <button @click="fetchWeather" :disabled="loading" class="search-btn">
          {{ loading ? "Loading..." : "Get Weather" }}
        </button>
      </div>
  
      <div v-if="weather" class="weather-info">
        <h2>
          <i class="fas fa-map-marker-alt"></i> {{ weather.name }}, {{ weather.sys.country }}
        </h2>
        <div class="weather-details">
          <p><i class="fas fa-thermometer-half"></i> Temperature: {{ weather.main.temp }}°C</p>
          <p><i class="fas fa-cloud"></i> Weather: {{ weather.weather[0].description }}</p>
          <p><i class="fas fa-tint"></i> Humidity: {{ weather.main.humidity }}%</p>
          <p><i class="fas fa-wind"></i> Wind Speed: {{ weather.wind.speed }} m/s</p>
        </div>
      </div>
  
      <div v-if="error" class="error-message">
        <p>{{ error }}</p>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data()
  {
    return {
      city: "",
      weather: null,
      error: null,
      loading: false,
      apiKey: process.env.VUE_APP_OPENWEATHER_KEY,
    };
  },
  methods: {
    async fetchWeather()
    {
      const city = this.city.trim();
      if (!city)
      {
        this.error = "Please enter a city name!";
        return;
      }

      this.loading = true;
      this.error = null;

      const url = `https://api.openweathermap.org/data/2.5/weather` + `?q=${encodeURIComponent(city)}&units=metric&appid=${this.apiKey}`;

      try
      {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok)
        {
          this.weather = null;
          this.error = data.message || "Something went wrong";
          return;
        }

        this.weather = data;
      } catch (err)
      {
        this.weather = null;
        this.error = "Error fetching data. Please try again later.";
      } finally
      {
        this.loading = false;
      }
    },
  },
  computed: {
    weatherClass()
    {
      if (!this.weather) return "weather--default";
      return `weather--${this.weather.weather[0].main.toLowerCase()}`;
    },
  }
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


body {
  font-family: 'Poppins', sans-serif;
  background-color: #f0f8ff;
  color: #333;
  text-align: center;
  padding: 20px;
}

#app {
  max-width: 500px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
}

.app-title {
  font-size: 2em;
  color: #2c3e50;
  margin-bottom: 20px;
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.city-input {
  padding: 10px;
  font-size: 1em;
  border: 2px solid #2c3e50;
  border-radius: 5px;
  outline: none;
  width: 70%;
}

.search-btn {
  padding: 10px 20px;
  font-size: 1em;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background-color: #2980b9;
}

.weather-info {
  margin-top: 20px;
}

.weather-info h2 {
  font-size: 1.5em;
  color: #34495e;
}

.weather-details p {
  font-size: 1.2em;
  margin: 5px 0;
}

.weather-details i {
  margin-right: 8px;
  color: #2980b9;
}

.error-message {
  color: red;
  margin-top: 20px;
}

.weather-info .fas {
  color: #2980b9;
  margin-right: 5px;
}
</style>
