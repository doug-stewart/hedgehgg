import { format } from "date-fns";
import type { Episode } from "@/types";
import styles from "./EpisodeCalendarItem.module.css";

type EpisodeCalendarItemProps = {
  episode: Episode;
};

export const EpisodeCalendarItem = ({ episode }: EpisodeCalendarItemProps) => {
  return (
    <li className={styles.show}>
      <time
        className={styles.when}
        dateTime={episode.airingAt}
        title={format(episode.airingAt, "MMM do, HH:mm")}
      >
        {format(episode.airingAt, "eee, HH:mm")}
      </time>
      <span className={styles.series}>{episode.series}</span>
      <span className={styles.numbers}>
        s{episode.seasonNumber}e{String(episode.episodeNumber).padStart(2, "0")}
      </span>
      <span className={styles.title}>{episode.title}</span>
    </li>
  );
};
