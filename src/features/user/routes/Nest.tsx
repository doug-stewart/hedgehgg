import { Hotkeys } from "@/components/hotkeys/Hotkeys";
import { Shows } from "@/components/shows/Shows";
import { Bookmarks } from "@/features/bookmarks/components/bookmarks/Bookmarks";
import { Search } from "@/features/search/components/search/Search";
import { Services } from "@/features/services/components/services/Services";
import { Weather } from "@/features/weather/components/weather/Weather";

export const Nest = () => {
  return (
    <>
      <title>Your Nest • Hedge.gg</title>
      <Weather />
      <Search />
      <Services />
      <Shows />
      <Bookmarks />
      <Hotkeys />
    </>
  );
};
