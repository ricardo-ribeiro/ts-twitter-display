import express from "express";
import TwitterClient from "twitter";
import { ImplBaseController } from "../impl/ImplBaseController";
export class ApplicationTimelines extends ImplBaseController {
  private user_ids = [];
  constructor(injectables, app) {
    super(injectables, app);
    this.registerHandler("get", "/api/timeli", this.handler);
  }
  handler(req: express.Request, res: express.Response) {
    
  }
}
