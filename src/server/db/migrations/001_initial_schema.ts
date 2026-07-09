import { type Kysely, sql } from "kysely";

// Creates the application-owned tables. Uses ifNotExists so it applies cleanly
// to a fresh database as well as one already provisioned.
export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable("profile")
    .ifNotExists()
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("linkwarden_url", "text")
    .addColumn("linkwarden_token", "text")
    .addColumn("sonarr_url", "text")
    .addColumn("sonarr_api_key", "text")
    .addColumn("geolocation_latitude", sql`numeric(9, 6)`)
    .addColumn("geolocation_longitude", sql`numeric(9, 6)`)
    .execute();

  await db.schema
    .createTable("services")
    .ifNotExists()
    .addColumn("id", "integer", (col) =>
      col.generatedAlwaysAsIdentity().primaryKey(),
    )
    .addColumn("user_id", "text", (col) => col.notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("href", "text", (col) => col.notNull())
    .addColumn("abbr", "text", (col) => col.notNull())
    .addColumn("icon", "text")
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable("services").ifExists().execute();
  await db.schema.dropTable("profile").ifExists().execute();
}
