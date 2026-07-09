import { AppError, BadRequestError } from "../errors/AppError";
import * as profileRepository from "../repositories/profileRepository";
import type { SonarrCalendarResponse, SonarrEpisode } from "../types/sonarr";

export const getCurrentUserSonarr = async (
  userId: string,
): Promise<{ api_key: string; url: string }> => {
  const profile = await profileRepository.findById(userId);
  const api_key = profile?.sonarr_api_key;
  const url = profile?.sonarr_url;

  if (!api_key || !url) {
    throw new BadRequestError("Sonarr API key or URL not set in profile");
  }

  return { api_key, url };
};

export const getSonarrUpcoming = async (
  url: string,
  api_key: string,
): Promise<Array<SonarrEpisode>> => {
  try {
    const start = new Date().toISOString();
    const end = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const options = {
      method: "GET",
      headers: {
        "X-Api-Key": api_key,
      },
    };

    const response = await fetch(
      `${url}/api/v3/calendar?start=${start}&end=${end}&includeSeries=true`,
      options,
    );
    const data = (await response.json()) as SonarrCalendarResponse;

    return data.map((item) => ({
      airingAt: item.airDateUtc,
      episodeNumber: item.episodeNumber,
      id: item.id,
      seasonNumber: item.seasonNumber,
      series: item.series.title,
      title: item.title,
    }));
  } catch (_) {
    throw new AppError("Failed to fetch Sonarr episodes", 502);
  }
};
