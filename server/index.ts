import * as dotenv from "dotenv";
import express from "express";
import TwitterClient from "twitter";
import {
  AppServer,
} from "./AppServer";
import { TwitterSearchController } from "./controllers/TwitterSearchController";
import { TwitterGetUserTimelineController } from "./controllers/TwitterGetUserTimelineController";
dotenv.config();

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET,
} = process.env;

const twittClient = new TwitterClient({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  access_token_key: TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
});

const server = new AppServer(
  { port: 9990 },
  {
    middlewares: [express.json()],
    controllers: [TwitterSearchController, TwitterGetUserTimelineController],
  },
  { twitter: twittClient }
);

server.start();
