import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const db = neon(connectionString);

export default db;

export async function initDB() {
  try {
    await db`CREATE TABLE IF NOT EXISTS Transactions ( 
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount NUMERIC(10, 4) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`;
    console.log("Database initialized successfully");
  } catch (err) {
    console.error("Error creating table:", err);
    process.exit(1); // status code 1 indicates failure
  }
}
