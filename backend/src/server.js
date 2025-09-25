import express from "express";
import "dotenv/config";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import tranrouter from "./routes/transactionsRoute.js";

const app = express();
app.use(express.json()); // middleware to parse JSON bodies
app.use(rateLimiter);
const PORT = process.env.PORT || 3000;

app.use("/api/transactions", tranrouter);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
