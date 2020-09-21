import express from "express";
import TwitterClient from "twitter";
import { ImplBaseController } from "../impl/ImplBaseController";
export class TwitterSearchController extends ImplBaseController {
  constructor(injectables, app) {
    super(injectables, app);
    this.registerHandler("get", "/api/twitter/user/:screen_name", this.handler);
  }
  handler(req: express.Request, res: express.Response) {
    let { screen_name } = req.params;
    this.injectables.twitter
      .get("users/search", { q: screen_name.replace("@", "") })
      .then((tresponse: TwitterClient.ResponseData) => {
        res.json(tresponse);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "ETIMEDOUT") {
          res.send(408).json({ status: "Timed out" });
        }
        else {
          res.send(400).json({ status: "Error with request" });
        }
      });
  }
}
