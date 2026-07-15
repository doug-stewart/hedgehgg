import { promises as fs } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { FileMigrationProvider, Migrator } from "kysely/migration";
import { db } from "./database";

// Runs all pending migrations from ./migrations to bring the schema up to date.
// Run locally via `pnpm db:migrate` (after `pnpm auth:migrate`, which creates
// the Better-Auth `user` table that migration 002 references).
const migrationFolder = path.join(path.dirname(fileURLToPath(import.meta.url)), "migrations");

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({ fs, path, migrationFolder }),
});

const { error, results } = await migrator.migrateToLatest();

for (const result of results ?? []) {
  if (result.status === "Success") {
    console.log(`MIGRATE::applied ${result.migrationName}`);
  } else if (result.status === "Error") {
    console.error(`MIGRATE::failed ${result.migrationName}`);
  }
}

if (error) {
  console.error("MIGRATE::migration error:", error);
  await db.destroy();
  process.exit(1);
}

await db.destroy();
console.log("MIGRATE::schema up to date");
