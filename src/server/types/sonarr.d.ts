export type SonarrEpisodeResponse = {
  id: number;
  seriesId: number;
  tvdbId: number;
  episodeFileId: number;
  seasonNumber: number;
  episodeNumber: number;
  title: string | null;
  airDate: string | null;
  airDateUtc: string | null;
  overview: string | null;
  hasFile: boolean;
  monitored: boolean;
  series: {
    id: number;
    title: string | null;
    year: number;
  };
};

export type SonarrCalendarResponse = Array<SonarrEpisodeResponse>;

export type SonarrEpisode = Pick<
  SonarrEpisodeResponse,
  "episodeNumber" | "id" | "seasonNumber" | "title"
> & {
  airingAt: string | null;
  series: string | null;
};
