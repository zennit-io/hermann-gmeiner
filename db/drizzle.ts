import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const connectionString = process.env.DATABASE_URL!;

const pool = new Pool({
  connectionString,
});

const db = drizzle(pool);

export default db;
