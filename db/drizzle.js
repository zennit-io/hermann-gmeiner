import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
const {Pool} = pg;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: connectionString,
});

const db = drizzle(pool);
export default db;