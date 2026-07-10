import { EpisodeCalendar } from "@/components/episode-calendar/EpisodeCalendar";
import { Hotkeys } from "@/components/hotkeys/Hotkeys";
import { redirectIfNoSession } from "@/features/auth/helpers/redirectIfNoSession";
import { Bookmarks } from "@/features/bookmarks/components/bookmarks/Bookmarks";
import { Search } from "@/features/search/components/search/Search";
import { ServiceLinks } from "@/features/services/components/service-links/ServiceLinks";
import { Weather } from "@/features/weather/components/weather/Weather";

export default async function Page() {
  await redirectIfNoSession();
  return (
    <>
      <title>Your Nest • Hedge.gg</title>
      <Weather />
      <Search />
      <ServiceLinks />
      <EpisodeCalendar />
      <Bookmarks />
      <Hotkeys />
    </>
  );
}
