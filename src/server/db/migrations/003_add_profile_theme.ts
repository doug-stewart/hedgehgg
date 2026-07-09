import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .alterTable("profile")
    .addColumn("theme", "text", (col) =>
      col.check(sql`theme IN ('light', 'dark', 'system', 'geolocation')`),
    )
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.alterTable("profile").dropColumn("theme").execute();
}
