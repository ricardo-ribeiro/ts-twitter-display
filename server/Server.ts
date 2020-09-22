import * as dotenv from "dotenv";
import express from "express";
import TwitterClient from "twitter";
import { AppServer } from "./impl/AppServer";
import { TwitterSearchController } from "./controllers/TwitterSearchController";
import { TwitterGetUserTimelineController } from "./controllers/TwitterGetUserTimelineController";
import cacheRedisMiddleware from "express-redis-cache";
import { GetLinkMetaInfo } from "./controllers/GetLinkMeta";

dotenv.config();

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET,
  PORT,
  REDIS_HOST
} = process.env;

const twittClient = new TwitterClient({
  consumer_key: TWITTER_CONSUMER_KEY || "",
  consumer_secret: TWITTER_CONSUMER_SECRET || "",
  access_token_key: TWITTER_ACCESS_TOKEN_KEY || "",
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET || "",
});

var redisCache = cacheRedisMiddleware({host: REDIS_HOST || "localhost", port:6379});

const server = new AppServer(
  { port: Number(PORT) || 9990 },
  {
    middlewares: [express.json(), express.static("build/")],
    controllers: [
      TwitterSearchController,
      TwitterGetUserTimelineController,
      GetLinkMetaInfo,
    ],
  },
  {
    twitter: twittClient,
    cache: redisCache,
  }
);

export default server;
