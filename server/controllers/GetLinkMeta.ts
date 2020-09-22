import express from "express";
import { ImplBaseController } from "../impl/ImplBaseController";
import grabity from "grabity";

export class GetLinkMetaInfo extends ImplBaseController {
  constructor(injectables, app) {
    super(injectables, app);
    this.registerHandler(
      "get",
      "/api/link/meta",
      this.injectables.cache.route({ expire: 1800 }), // Cache Results For Request Expire in 30min
      this.handler
    );
  }
  handler(req: express.Request, res: express.Response) {
    let { link }  = req.query;
    if(!String(link).includes("127.0.0.1") && !String(link).includes("localhost")&& !String(link).includes("::1")){
        grabity.grabIt(link).then(response=>{
            res.json(response)
        }).catch(error=>{
            res.status(400);
        })
    }else{
        res.status(400);
    }
  }
}
