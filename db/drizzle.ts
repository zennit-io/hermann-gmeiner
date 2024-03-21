import { Pool } from "pg";
import { drizzle } from "drizzle-orm/postgres-js";

const pool = new Pool({
  connectionString: process.env.DB_URL!,
});

const db = drizzle(pool);

export default db;
