import redis from "redis";

let client;

(async () => {
  client = redis.createClient();

  client.on("error", (error) => console.error(`Error : ${error}`));

  await client.connect();
})();

export default client;