import { format } from "date-fns";
import { useSonarr } from "../../hooks/useSonarr";
import styles from "./Shows.module.css";

export const Shows = () => {
  const { upcoming } = useSonarr();

  return (
    <section className={styles.shows}>
      <h2>Upcoming Shows</h2>
      <ul className={styles.list}>
        {upcoming?.map(({ id, title, series, seasonNumber, episodeNumber, airingAt }) => (
          <li className={styles.show} key={id}>
            <span className={styles.when}>
              <time dateTime={airingAt} title={format(airingAt, "MMM do, HH:mm")}>
                {format(airingAt, "eee, HH:mm")}
              </time>
            </span>
            <span className={styles.series}>{series}</span>
            <span className={styles.episode}>
              <span className={styles.numbers}>
                s{seasonNumber}e{String(episodeNumber).padStart(2, "0")}
              </span>
              {title}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
