import type { Insertable } from "kysely";
import { db } from "../db/database";
import type { ProfileTable } from "../db/types";

export const findById = (id: string) =>
  db.selectFrom("profile").selectAll().where("id", "=", id).executeTakeFirst();

export const upsert = (profile: Insertable<ProfileTable>) =>
  db
    .insertInto("profile")
    .values(profile)
    .onConflict((oc) =>
      oc.column("id").doUpdateSet((eb) => ({
        linkwarden_token: eb.ref("excluded.linkwarden_token"),
        linkwarden_url: eb.ref("excluded.linkwarden_url"),
        sonarr_api_key: eb.ref("excluded.sonarr_api_key"),
        sonarr_url: eb.ref("excluded.sonarr_url"),
        geolocation_latitude: eb.ref("excluded.geolocation_latitude"),
        geolocation_longitude: eb.ref("excluded.geolocation_longitude"),
        theme: eb.ref("excluded.theme"),
      })),
    )
    .returningAll()
    .executeTakeFirstOrThrow();

export const updateTheme = (id: string, theme: ProfileTable["theme"]) =>
  db
    .insertInto("profile")
    .values({
      id,
      linkwarden_token: null,
      linkwarden_url: null,
      sonarr_api_key: null,
      sonarr_url: null,
      geolocation_latitude: null,
      geolocation_longitude: null,
      theme,
    })
    .onConflict((oc) =>
      oc.column("id").doUpdateSet((eb) => ({
        theme: eb.ref("excluded.theme"),
      })),
    )
    .returningAll()
    .executeTakeFirstOrThrow();
