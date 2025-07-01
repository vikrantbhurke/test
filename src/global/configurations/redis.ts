"use server";
import { Redis } from "ioredis";

let redis: Redis | null = null;

const connectRedis = async (): Promise<Redis> => {
  if (redis) return redis;
  if (!process.env.REDIS_URL) throw new Error("REDIS_URL is not defined");

  try {
    redis = new Redis(process.env.REDIS_URL);
    redis.on("connect", () => console.log("✅ Redis connected"));
    redis.on("error", (err) => console.error("⛔ Redis error", err));
    return redis;
  } catch (error) {
    console.error("⛔ Redis didn't connect");
    console.error(error);
    process.exit(1);
  }
};

export default connectRedis;
