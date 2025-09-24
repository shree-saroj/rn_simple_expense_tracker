import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const db = neon(connectionString);

export default db;
