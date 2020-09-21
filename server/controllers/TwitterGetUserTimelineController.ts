import express from "express";
import TwitterClient from "twitter";
import { ImplBaseController } from "../impl/ImplBaseController";
export class TwitterGetUserTimelineController extends ImplBaseController {
  constructor(injectables, app) {
    super(injectables, app);
    this.registerHandler("get", "/api/tweets/:user_id", this.handler);
  }
  handler(req: express.Request, res: express.Response) {
    let { user_id } = req.params;
    this.injectables.twitter
      .get("statuses/user_timeline", { user_id: user_id, tweet_mode: 'extended' })
      .then((tresponse: TwitterClient.ResponseData) => {
        res.json(tresponse);

      })
      .catch((error) => {
        res.status(400);
      });
  }
}
