import * as z from "zod";

const error = "Both fields required";

const isMissingItsPair = (value1: string | undefined, value2: string | undefined) =>
  (value1 === "" && value2 !== "") === false;

export const profileSchema = z
  .object({
    geolocation_latitude: z.string().optional(),
    geolocation_longitude: z.string().optional(),
    linkwarden_token: z.string().optional(),
    linkwarden_url: z.url().or(z.literal("")).optional(),
    sonarr_api_key: z.string().optional(),
    sonarr_url: z.url().or(z.literal("")).optional(),
    theme: z.enum(["light", "dark", "system", "geolocation"]).or(z.literal("")).optional(),
  })
  .refine((data) => isMissingItsPair(data.geolocation_latitude, data.geolocation_longitude), {
    error,
    path: ["geolocation_latitude"],
  })
  .refine((data) => isMissingItsPair(data.geolocation_longitude, data.geolocation_latitude), {
    error,
    path: ["geolocation_longitude"],
  })
  .refine((data) => isMissingItsPair(data.linkwarden_token, data.linkwarden_url), {
    error,
    path: ["linkwarden_token"],
  })
  .refine((data) => isMissingItsPair(data.linkwarden_url, data.linkwarden_token), {
    error,
    path: ["linkwarden_url"],
  })
  .refine((data) => isMissingItsPair(data.sonarr_api_key, data.sonarr_url), {
    error,
    path: ["sonarr_api_key"],
  })
  .refine((data) => isMissingItsPair(data.sonarr_url, data.sonarr_api_key), {
    error,
    path: ["sonarr_url"],
  });
