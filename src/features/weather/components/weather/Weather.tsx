import { useWeather } from "../../hooks/useWeather";
import styles from "./Weather.module.css";

export const Weather = () => {
  const { forecast, isLoading } = useWeather();

  return (
    <section className={styles.weather} data-code={forecast?.weather.code}>
      <h2 className={styles.title}>Weather</h2>
      {isLoading ? (
        <p className={styles.explanation}>&hellip;</p>
      ) : forecast ? (
        <>
          <img
            alt=""
            className={styles.icon}
            src={`https://cdn.meteocons.com/3.0.0-next.10/svg/fill/${forecast.weather.icon}.svg`}
          />
          <p className={styles.explanation}>{forecast.weather.explanation}</p>
          <dl className={styles.stats}>
            <dt>Temp</dt>
            <dd>
              {forecast.temperature.actual}° F<span>({forecast.temperature.feelsLike}° F)</span>
            </dd>
            <dt>AQI</dt>
            <dd>
              {forecast.aqi}
              <span>{forecast.pm25} pm2.5</span>
              <span>{forecast.pm10} pm10</span>
            </dd>
            <dt>Rain</dt>
            <dd>{forecast.precipitation}%</dd>
            <dt>Wind</dt>
            <dd>{forecast.windspeed} mph</dd>
            <dt>UV Index</dt>
            <dd>
              {forecast.uvIndex.value}
              <span>{forecast.uvIndex.explanation}</span>
            </dd>
          </dl>
        </>
      ) : (
        <p>&hellip;Uh&hellip;</p>
      )}
    </section>
  );
};
