import { z } from "zod";

const theme = z.enum(["light", "dark", "system", "geolocation"]);

export const updateProfileSchema = z.object({
  linkwarden_token: z.string().nullish(),
  linkwarden_url: z.string().nullish(),
  sonarr_api_key: z.string().nullish(),
  sonarr_url: z.string().nullish(),
  geolocation_latitude: z.union([z.string(), z.number()]).nullish(),
  geolocation_longitude: z.union([z.string(), z.number()]).nullish(),
  theme: theme.nullable(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const updateThemeSchema = z.object({
  theme: theme,
});

export type UpdateThemeInput = z.infer<typeof updateThemeSchema>;
