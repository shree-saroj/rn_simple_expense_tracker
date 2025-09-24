import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import "dotenv/config";

if (
  !process.env.UPSTASH_REDIS_REST_URL ||
  !process.env.UPSTASH_REDIS_REST_TOKEN
) {
  throw new Error(
    "Upstash Redis environment variables (UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN) are required."
  );
}

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60 s"), // 4 requests per 60 seconds
});

export default rateLimit;
