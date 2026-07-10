import { Hotkeys } from "@/components/hotkeys/Hotkeys";
import { Shows } from "@/components/shows/Shows";
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
      <Shows />
      <Bookmarks />
      <Hotkeys />
    </>
  );
}
