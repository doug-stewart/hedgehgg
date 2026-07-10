import { type Kysely, sql } from "kysely";

// Adds the user-defined display order for services. Previously the list was
// sorted by name at query time.
export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema.alterTable("services").addColumn("sort_order", "integer").execute();

  // Seed each user's order from the alphabetical sort the list used to apply,
  // so existing dashboards look unchanged after this migration.
  await sql`
    UPDATE services AS s
    SET sort_order = v.rn
    FROM (
      SELECT id, row_number() OVER (PARTITION BY user_id ORDER BY name) - 1 AS rn
      FROM services
    ) AS v
    WHERE s.id = v.id
  `.execute(db);

  await db.schema
    .alterTable("services")
    .alterColumn("sort_order", (col) => col.setNotNull())
    .execute();

  await db.schema
    .createIndex("services_user_id_sort_order_index")
    .on("services")
    .columns(["user_id", "sort_order"])
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropIndex("services_user_id_sort_order_index").ifExists().execute();
  await db.schema.alterTable("services").dropColumn("sort_order").execute();
}
