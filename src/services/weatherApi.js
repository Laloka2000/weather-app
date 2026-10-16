const API_KEY = process.env.VUE_APP_OPENWEATHER_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

function buildLocationParams(query) {
  if (query.city) return { q: query.city };
  return { lat: query.lat, lon: query.lon };
}

async function request(endpoint, query) {
  const params = new URLSearchParams({
    ...buildLocationParams(query),
    units: "metric",
    appid: API_KEY,
  });

  let response;
  try {
    response = await fetch(`${BASE_URL}/${endpoint}?${params}`);
  } catch (err) {
    throw new Error("Error fetching data. Please try again later");
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export async function getCurrentWeather(query) {
  return request("weather", query);
}

export function getForecast(query) {
  return request("forecast", query);
}
