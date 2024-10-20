<template>
  <div id="app" class="weather-app">
    <h1 class="app-title">Weather App 🌤</h1>

    <div class="search-container">
      <input v-model="city" @keyup.enter="fetchWeather" placeholder="Enter city name" class="city-input" />
      <button @click="fetchWeather" class="search-btn">Get Weather</button>
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
      apiKey: "5a6d6ba588d803c097c55e2bdf780528", // replace with your actual API key
    };
  },
  methods: {
    async fetchWeather()
    {
      if (this.city === "")
      {
        this.error = "Please enter a city name!";
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.apiKey}`;

      try
      {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200)
        {
          this.weather = data;
          this.error = null;
        } else
        {
          this.error = data.message;
        }
      } catch (err)
      {
        this.error = "Error fetching data. Please try again later.";
      }
      if (this.weather.weather[0].main === 'Clear')
      {
        document.body.style.backgroundColor = '#87CEEB'; // Light Blue
      } else if (this.weather.weather[0].main === 'Clouds')
      {
        document.body.style.backgroundColor = '#D3D3D3'; // Light Gray
      } else if (this.weather.weather[0].main === 'Rain')
      {
        document.body.style.backgroundColor = '#A9A9A9'; // Dark Gray
      }

    },
  },
};
</script>

<style scoped>
/* General Styles */
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
