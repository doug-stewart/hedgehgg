import { type Kysely, sql } from "kysely";

// Removes the services table now that the Services feature has been retired.
// Dropping the table cascades away the services_user_id_fkey constraint (002)
// and the services_user_id_sort_order_index (004).
export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable("services").ifExists().execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable("services")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.generatedAlwaysAsIdentity().primaryKey())
    .addColumn("user_id", "text", (col) => col.notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("href", "text", (col) => col.notNull())
    .addColumn("abbr", "text", (col) => col.notNull())
    .addColumn("icon", "text")
    .addColumn("sort_order", "integer", (col) => col.notNull())
    .execute();

  await sql`
    ALTER TABLE services
    ADD CONSTRAINT services_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE
  `.execute(db);

  await db.schema
    .createIndex("services_user_id_sort_order_index")
    .on("services")
    .columns(["user_id", "sort_order"])
    .execute();
}
