export function getCurrentTime() {
  const now = new Date();
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return now.toLocaleTimeString("en-CA", {
    timeZone: userTimezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export async function fetchWeatherData(latitude: string, longitude: string) {
  const BASE_URL = "https://api.open-meteo.com/v1/forecast";
  // const LATITUDE = 43.4723;
  // const LONGITUDE = -80.5449;
  const TIMEZONE = "EST";
  const PARAMETERS = "temperature_2m";

  const apiUrl = `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&timezone=${TIMEZONE}&current=${PARAMETERS}`;

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

export async function getUserLocationData() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    const data = await response.json();
    
    const locationData = {
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude
    };

    return locationData;
  } catch (error) {
    console.error('Error fetching location data:', error);
    return null;
  }
}
