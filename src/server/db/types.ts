import type { ColumnType, Generated } from "kysely";

// This interface is hand-maintained. Only the application-owned tables are
// modelled here; the Better-Auth managed tables (user, session, account,
// verification, passkey) live in the same database but are not queried through
// Kysely.

// PostgreSQL returns NUMERIC as a string; accept a number or string on write.
type Numeric = ColumnType<
  string | null,
  number | string | null,
  number | string | null
>;

export interface ProfileTable {
  id: string;
  linkwarden_url: string | null;
  linkwarden_token: string | null;
  sonarr_url: string | null;
  sonarr_api_key: string | null;
  geolocation_latitude: Numeric;
  geolocation_longitude: Numeric;
  theme: "light" | "dark" | "system" | "geolocation" | null;
}

export interface ServicesTable {
  // GENERATED ALWAYS AS IDENTITY — omit on insert unless explicitly overriding.
  id: Generated<number>;
  user_id: string;
  name: string;
  href: string;
  abbr: string;
  icon: string | null;
}

export interface Database {
  profile: ProfileTable;
  services: ServicesTable;
}
