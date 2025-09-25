import express from "express";
import "dotenv/config";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import tranrouter from "./routes/transactionsRoute.js";
import job from "./config/cron.js";

const app = express();
if (process.env.NODE_ENV === "production") job.start();

// middlewares
app.use(express.json());
app.use(rateLimiter);
const PORT = process.env.PORT || 3000;

app.use("/api/transactions", tranrouter);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
