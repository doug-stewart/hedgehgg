import type { fetchWeatherApi } from "openmeteo";

export type WeatherApiResponse = Awaited<ReturnType<typeof fetchWeatherApi>>;
