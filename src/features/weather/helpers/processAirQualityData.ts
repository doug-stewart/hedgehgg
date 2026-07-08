import type { WeatherApiResponse } from "../types";
import { interpretUvIndex } from "./interpretUVIndex";

export const processAirQualityData = (responses: WeatherApiResponse) => {
  const response = responses[0];
  const current = response.current();

  if (!current) {
    console.error("Error: Unable to retrieve current air quality data from response");
  }

  const data = {
    aqi: Math.round(current?.variables(3)?.value() || 0),
    pm10: Math.round(current?.variables(1)?.value() || 0),
    pm25: Math.round(current?.variables(2)?.value() || 0),
    uvIndex: {
      value: Math.round(current?.variables(0)?.value() ?? 0),
      explanation: interpretUvIndex(current?.variables(0)?.value() ?? 0),
    },
  };

  return data;
};
