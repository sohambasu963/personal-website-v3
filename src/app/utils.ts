export function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString("en-CA", {
    timeZone: "America/Toronto",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export async function fetchWeatherData() {
  const BASE_URL = "https://api.open-meteo.com/v1/forecast";
  const LATITUDE = 43.4723;
  const LONGITUDE = -80.5449;
  const TIMEZONE = "EST";
  const PARAMETERS = "temperature_2m";

  const apiUrl = `${BASE_URL}?latitude=${LATITUDE}&longitude=${LONGITUDE}&timezone=${TIMEZONE}&current=${PARAMETERS}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}
