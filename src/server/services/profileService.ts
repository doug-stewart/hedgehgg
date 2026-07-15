import * as profileRepository from "../repositories/profileRepository";
import type { UpdateProfileInput, UpdateThemeInput } from "../schemas/profile.schema";

// A user has no profile row until they save one; return an all-null profile so
// clients get a stable shape instead of a 404 on first load.
const emptyProfile = (id: string) => ({
  id,
  linkwarden_token: null,
  linkwarden_url: null,
  sonarr_api_key: null,
  sonarr_url: null,
  geolocation_latitude: null,
  geolocation_longitude: null,
  theme: null,
});

export const getProfile = async (userId: string) => {
  const profile = await profileRepository.findById(userId);
  return profile ?? emptyProfile(userId);
};

export const saveProfile = (userId: string, input: UpdateProfileInput) =>
  profileRepository.upsert({
    id: userId,
    linkwarden_token: input.linkwarden_token ?? null,
    linkwarden_url: input.linkwarden_url ?? null,
    sonarr_api_key: input.sonarr_api_key ?? null,
    sonarr_url: input.sonarr_url ?? null,
    geolocation_latitude: input.geolocation_latitude ?? null,
    geolocation_longitude: input.geolocation_longitude ?? null,
    theme: input.theme ?? null,
  });

export const updateTheme = (userId: string, input: UpdateThemeInput) =>
  profileRepository.updateTheme(userId, input.theme);
