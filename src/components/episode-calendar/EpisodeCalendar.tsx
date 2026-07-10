"use client";

import { useSonarr } from "../../hooks/useSonarr";
import { EpisodeCalendarItem } from "../episode-calendar-item/EpisodeCalendarItem";
import styles from "./EpisodeCalendar.module.css";

export const EpisodeCalendar = () => {
  const { upcoming } = useSonarr();

  return (
    <section className={styles.shows}>
      <h2 className={styles.title}>Upcoming Shows</h2>
      <ul className={styles.list}>
        {upcoming?.map((episode) => (
          <EpisodeCalendarItem episode={episode} key={episode.id} />
        ))}
      </ul>
    </section>
  );
};
