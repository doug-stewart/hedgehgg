import type { User } from "../types";

export const normalizeProfile = (userId: string, profileData: User | undefined) =>
  ({
    id: userId,
    linkwarden_token: profileData?.linkwarden_token ?? null,
    linkwarden_url: profileData?.linkwarden_url ?? null,
    sonarr_api_key: profileData?.sonarr_api_key ?? null,
    sonarr_url: profileData?.sonarr_url ?? null,
    geolocation_latitude: profileData?.geolocation_latitude ?? null,
    geolocation_longitude: profileData?.geolocation_longitude ?? null,
    theme: profileData?.theme ?? null,
  }) as User;
