type BaseUser = {
  id: string;
};

type WithLinkwarden = {
  linkwarden_token: string;
  linkwarden_url: string;
};

type WithoutLinkwarden = {
  linkwarden_token: null;
  linkwarden_url: null;
};

type Linkwarden = WithLinkwarden | WithoutLinkwarden;

type WithSonarr = {
  sonarr_api_key: string;
  sonarr_url: string;
};

type WithoutSonarr = {
  sonarr_api_key: null;
  sonarr_url: null;
};

type Sonarr = WithSonarr | WithoutSonarr;

type WithGeolocation = {
  geolocation_latitude: string;
  geolocation_longitude: string;
};

type WithoutGeolocation = {
  geolocation_latitude: null;
  geolocation_longitude: null;
};

type Geolocation = WithGeolocation | WithoutGeolocation;

export type ThemeValue = "light" | "dark" | "system" | "geolocation";

type WithTheme = {
  theme: ThemeValue;
};

type WithoutTheme = {
  theme: null;
};

type Theme = WithTheme | WithoutTheme;

export type User = (BaseUser & Linkwarden & Sonarr & Geolocation & Theme) | null;
