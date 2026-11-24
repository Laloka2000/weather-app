const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const MAX_RESULTS = 5;

export async function searchCities(query, { signal } = {}) {
  const params = new URLSearchParams({
    name: query,
    count: 10,
    language: "en",
    format: "json",
  });

  const response = await fetch(`${GEOCODING_URL}?${params}`, { signal });
  if (!response.ok) throw new Error("Could not load city suggestions");

  const data = await response.json();
  return (data.results || [])
    .filter((place) => place.feature_code?.startsWith("PPL"))
    .slice(0, MAX_RESULTS)
    .map((place) => ({
      id: place.id,
      name: place.name,
      region: [place.admin1, place.country].filter(Boolean).join(", "),
      lat: place.latitude,
      lon: place.longitude,
    }));
}
