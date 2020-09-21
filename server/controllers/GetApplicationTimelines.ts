import express from "express";
import TwitterClient from "twitter";
import { ImplBaseController } from "../impl/ImplBaseController";

const REDIS_TWITTER_TIMELINES_KEY = "TWITTER_TIMELINES";

export class GetApplicationTimelines extends ImplBaseController {
  private user_ids = [];
  constructor(injectables, app) {
    super(injectables, app);
    this.registerHandler("get", "/api/timelines", this.handler);
  }
  handler(req: express.Request, res: express.Response) {
    
  }
}
