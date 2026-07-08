import { useQuery } from "@tanstack/react-query";
import { fetchWeatherApi } from "openmeteo";
import { useProfile } from "../../user/hooks/useProfile";
import { airQualityParams, airQualityUrl, forecastParams, forecastUrl } from "../config";
import { processAirQualityData } from "../helpers/processAirQualityData";
import { processForecastData } from "../helpers/processForecastData";

export const useWeather = () => {
  const { profile } = useProfile();

  const geolocation = {
    latitude: profile?.geolocation_latitude,
    longitude: profile?.geolocation_longitude,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["weather"],
    queryFn: async () => {
      const airQualityResponse = await fetchWeatherApi(airQualityUrl, {
        ...geolocation,
        ...airQualityParams,
      });
      const forecastResponse = await fetchWeatherApi(forecastUrl, {
        ...geolocation,
        ...forecastParams,
      });

      const forecast = processForecastData(forecastResponse);
      const air = processAirQualityData(airQualityResponse);

      return { ...forecast, ...air };
    },
    enabled: Boolean(geolocation.latitude && geolocation.longitude),
    staleTime: Infinity,
  });

  return { forecast: data, isLoading };
};
