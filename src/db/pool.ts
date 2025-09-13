import { Pool } from "pg";
import { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } from "../env.js";

export const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});
