import { neonConfig, Pool } from "@neondatabase/serverless";
import type { PostgresPool } from "kysely";
import ws from "ws";

// Neon's serverless driver talks over WebSocket; in a Node runtime we must
// supply the WebSocket implementation. (In edge runtimes a global WebSocket
// exists, but the DB handlers force `runtime = "nodejs"` for Kysely.)
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Single shared connection pool, consumed by both Better-Auth and the Kysely
// dialect so the app maintains exactly one pool. Cast to Kysely's PostgresPool:
// Neon's Pool is structurally compatible for everything Kysely actually calls,
// but TS also structurally checks its unused optional `Client` constructor,
// whose `connect()` resolves `Promise<void>` (node-postgres style) rather than
// `Promise<Client>` — a difference kysely never actually exercises.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
}) as unknown as PostgresPool;
