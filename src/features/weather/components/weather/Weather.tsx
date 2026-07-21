"use client";

import { useId } from "react";
import { Tooltip } from "@/components/tooltip/Tooltip";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { useTooltip } from "@/hooks/useTooltip";
import { useWeather } from "../../hooks/useWeather";
import styles from "./Weather.module.css";

export const Weather = () => {
  const id = useId();
  const { tooltipRef, showTooltip, hideTooltip } = useTooltip();
  const { city } = useGeoLocation();
  const { forecast, isLoading } = useWeather();

  return (
    <section
      aria-labelledby={`weather-title-${id}`}
      className={styles.weather}
      data-code={forecast?.weather.code}
    >
      <button
        aria-describedby={`weather-${id}`}
        className={styles.wrapper}
        onBlur={hideTooltip}
        onFocus={showTooltip}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        popoverTarget={`weather-${id}`}
        popoverTargetAction="toggle"
        type="button"
      >
        <span className={styles.title} id={`weather-title-${id}`}>
          Current weather in <strong>{city ?? "Nowhere"}</strong> is:
        </span>
        {isLoading ? (
          <span className={styles.explanation}>&hellip;</span>
        ) : forecast ? (
          <>
            {/* biome-ignore lint/performance/noImgElement: external SVG asset */}
            <img
              alt=""
              className={styles.icon}
              src={`https://cdn.meteocons.com/3.0.0-next.10/svg/fill/${forecast.weather.icon}.svg`}
            />
            <span className={styles.explanation}>
              {forecast.weather.explanation} and {forecast.temperature.actual}° F{" "}
              <span>({forecast.temperature.feelsLike}° F)</span>
            </span>
          </>
        ) : (
          <span>&hellip;Uh&hellip;</span>
        )}
      </button>
      {forecast && (
        <Tooltip align="bottom" id={`weather-${id}`} ref={tooltipRef}>
          <dl className={styles.stats}>
            <dt>AQI</dt>
            <dd>
              {forecast.aqi}
              <span role="presentation">|</span>
              {forecast.pm25} pm2.5
              <span role="presentation">|</span>
              {forecast.pm10} pm10
            </dd>
            <dt>Rain</dt>
            <dd>{forecast.precipitation}%</dd>
            <dt>Wind</dt>
            <dd>{forecast.windspeed} mph</dd>
            <dt>UV Index</dt>
            <dd>
              {forecast.uvIndex.value} ({forecast.uvIndex.explanation})
            </dd>
          </dl>
        </Tooltip>
      )}
    </section>
  );
};
