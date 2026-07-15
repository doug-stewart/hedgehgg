import { EpisodeCalendar } from "@/components/episode-calendar/EpisodeCalendar";
import { Hotkeys } from "@/components/hotkeys/Hotkeys";
import { PinnedLinks } from "@/features/linkwarden/components/pinned-links/PinnedLinks";
import { Search } from "@/features/search/components/search/Search";
import { Weather } from "@/features/weather/components/weather/Weather";
import styles from "./page.module.css";

export default function Page() {
  return (
    <>
      <title>Your Nest • Hedge.gg</title>
      <div className={styles.top}>
        <Weather />
      </div>
      <div className={styles.mid}>
        <Search />
        <PinnedLinks />
      </div>
      <div className={styles.bottom}>
        <EpisodeCalendar />
      </div>
      <Hotkeys />
    </>
  );
}
