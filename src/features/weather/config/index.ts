export const airQualityParams = {
  current: ["uv_index_clear_sky", "pm10", "pm2_5", "us_aqi", "european_aqi"],
};

export const forecastParams = {
  current: [
    "wind_speed_10m",
    "temperature_2m",
    "precipitation",
    "is_day",
    "relative_humidity_2m",
    "apparent_temperature",
    "weather_code",
    "cloud_cover",
  ],
  timezone: "America/Los_Angeles",
  timeformat: "unixtime",
  wind_speed_unit: "mph",
  temperature_unit: "fahrenheit",
  precipitation_unit: "inch",
};

export const airQualityUrl = "https://air-quality-api.open-meteo.com/v1/air-quality";
export const forecastUrl = "https://api.open-meteo.com/v1/forecast";
