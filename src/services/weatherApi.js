const API_KEY = process.env.VUE_APP_OPENWEATHER_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeather(city) {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;

  let response;

  try {
    response = await fetch(url);
  } catch (err) {
    throw new Error("Error fetching data. Please try again later");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
