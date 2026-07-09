import { Kysely, PostgresDialect } from "kysely";
import { pool } from "./pool";
import type { Database } from "./types";

// Type-safe query builder over the shared Neon pool. Import `db` in repositories
// to run compile-time-checked queries against the schema in `./types`.
export const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool }),
});
