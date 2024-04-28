import { REDIS_EXPIRATION_TIME } from "../config/index.js";
import client from "./client.js";

const DEFAULT_EXPIRATION = REDIS_EXPIRATION_TIME;

async function getOrSetCache(key, cb) {
  const data = await client.get(key);
  if (data) {
    console.log("Cache hit");
    return JSON.parse(data);
  }
  console.log("Cache miss");
  const freshData = await cb();
  client.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
  return freshData;
}

export { getOrSetCache };
