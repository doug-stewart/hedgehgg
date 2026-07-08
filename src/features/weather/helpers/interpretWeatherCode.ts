/*
  Weather Codes: https://open-meteo.com/en/docs#weather_variable_documentation
  Weather Icons: https://meteocons.com/icons/?style=fill&category=miscellaneous
*/

export const interpretWeatherCode = (code: number, isDay: boolean) => {
  const base = isDay ? "day" : "night";

  switch (code) {
    case 0:
      return { icon: `clear-${base}`, explanation: "Clear skies" };
    case 1:
      return {
        icon: `mostly-clear-${base}`,
        explanation: "Mostly clear skies",
      };
    case 2:
      return { icon: `partly-cloudy-${base}`, explanation: "Partially cloudy" };
    case 3:
      return { icon: `cloudy`, explanation: "Cloudy" };
    case 45:
    case 48:
      return { icon: `fog-${base}`, explanation: "Foggy" };
    case 51:
      return {
        icon: `mostly-clear-${base}-drizzle`,
        explanation: "Light drizzle",
      };
    case 53:
      return {
        icon: `partly-cloudy-${base}-drizzle`,
        explanation: "Moderate drizzle",
      };
    case 55:
      return { icon: `overcast-${base}-drizzle`, explanation: "Heavy drizzle" };
    case 56:
      return { icon: "rainy-4", explanation: "Freezing light drizzle" };
    case 57:
      return { icon: "rainy-6", explanation: "Freezing steady drizzle" };
    case 61:
      return {
        icon: `mostly-clear-${base}-rain`,
        explanation: "Light raining",
      };
    case 63:
      return {
        icon: `partly-cloudy-${base}-rain`,
        explanation: "Moderate raining",
      };
    case 65:
      return { icon: `overcast-${base}-rain`, explanation: "Heavy raining" };
    case 66:
      return {
        icon: `mostly-clear-${base}-sleet`,
        explanation: "Freezing light rain",
      };
    case 67:
      return {
        icon: `partly-cloudy-${base}-sleet`,
        explanation: "Freezing steady rain",
      };
    case 71:
      return { icon: `partly-cloudy-${base}-snow`, explanation: "Light snow" };
    case 73:
      return { icon: `overcast-${base}-snow`, explanation: "Moderate snow" };
    case 75:
    case 77:
      return { icon: `extreme-${base}-snow`, explanation: "Heavy snow" };
    case 80:
      return {
        icon: `mostly-clear-${base}-rain`,
        explanation: "Light rain showers",
      };
    case 81:
      return {
        icon: `partly-cloudy-${base}-rain`,
        explanation: "Moderate rain showers",
      };
    case 82:
      return {
        icon: `overcast-${base}-rain`,
        explanation: "Heavy rain showers",
      };
    case 85:
      return {
        icon: `partly-cloudy-${base}-snow`,
        explanation: "Light snow flurries",
      };
    case 86:
      return {
        icon: `overcast-${base}-snow`,
        explanation: "Steady snow flurries",
      };
    case 95:
      return { icon: `thunderstorms-${base}`, explanation: "Thunderstorm" };
    case 96:
      return {
        icon: `thunderstorms-mostly-clear-${base}-hail`,
        explanation: "Thunderstorm and light hail",
      };
    case 99:
      return {
        icon: `thunderstorms-${base}-hail`,
        explanation: "Thunderstorm and heavy hail",
      };
    default:
      return { icon: "star", explanation: "The end times are here" };
  }
};
