import type { WeatherApiResponse } from "../types";
import { interpretWeatherCode } from "./interpretWeatherCode";

export const processForecastData = (responses: WeatherApiResponse) => {
  const response = responses[0];
  const current = response.current();

  if (!current) {
    console.error("Error: Unable to retrieve current weather data from response");
  }

  const code = current?.variables(6)?.value() || 0;
  const isDay = Boolean(current?.variables(3)?.value());

  const data = {
    windspeed: Math.round(current?.variables(0)?.value() || 0),
    temperature: {
      actual: Math.round(current?.variables(1)?.value() || 0),
      feelsLike: Math.round(current?.variables(5)?.value() || 0),
    },
    precipitation: Math.round(current?.variables(2)?.value() || 0),
    isDay: isDay,
    humidity: Math.round(current?.variables(4)?.value() || 0),
    weather: { code, ...interpretWeatherCode(code, isDay) },
    cloudCover: Math.round(current?.variables(7)?.value() || 0),
  };

  return data;
};
