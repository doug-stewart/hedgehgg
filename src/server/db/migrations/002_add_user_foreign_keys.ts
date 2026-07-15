import { type Kysely, sql } from "kysely";

// Links the application tables to the Better-Auth user table so rows are
// cleaned up when a user is deleted. Better-Auth's default user table is
// "user"; this runs after `pnpm auth:migrate`, so the user table already
// exists.
export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`
    ALTER TABLE profile
    ADD CONSTRAINT profile_user_id_fkey
    FOREIGN KEY (id) REFERENCES "user" (id) ON DELETE CASCADE
  `.execute(db);

  await sql`
    ALTER TABLE services
    ADD CONSTRAINT services_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE
  `.execute(db);
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await sql`ALTER TABLE services DROP CONSTRAINT IF EXISTS services_user_id_fkey`.execute(db);
  await sql`ALTER TABLE profile DROP CONSTRAINT IF EXISTS profile_user_id_fkey`.execute(db);
}
