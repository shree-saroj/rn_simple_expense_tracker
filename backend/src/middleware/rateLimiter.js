import rateLimit from "../config/upstashRedis.js";

const rateLimiter = async (req, res, next) => {
  try {
    // here we keep a fixed key for simplicity, but in a real app, you might want to use user-specific keys
    // e.g., based on user ID or IP address
    const { success } = await rateLimit.limit("my-rate-limit");
    if (!success) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
        status: 429,
        data: [],
      });
    }
    next();
  } catch (error) {
    console.error("Rate limiting error:", error);
    res.status(500).json({
      message: "Internal server error in rate limiter",
      status: 500,
      data: [],
    });
  }
};

export default rateLimiter;
