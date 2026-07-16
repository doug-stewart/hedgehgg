import { AppHeader } from "@/components/app-header/AppHeader";
import { EpisodeCalendar } from "@/components/episode-calendar/EpisodeCalendar";
import { PinnedLinks } from "@/features/linkwarden/components/pinned-links/PinnedLinks";
import { SearchForm } from "@/features/search/components/search-form/SearchForm";
import { Weather } from "@/features/weather/components/weather/Weather";
import styles from "./page.module.css";

export default function Page() {
  return (
    <>
      <title>Your Nest • Hedge.gg</title>
      <AppHeader />
      <div className={styles.top}>
        <Weather />
      </div>
      <div className={styles.mid}>
        <SearchForm />
        <PinnedLinks />
      </div>
      <div className={styles.bottom}>
        <EpisodeCalendar />
      </div>
    </>
  );
}
