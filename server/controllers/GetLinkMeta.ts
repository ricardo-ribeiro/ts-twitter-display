import express, { json } from "express";
import { ImplBaseController } from "../impl/ImplBaseController";
import grabity from "grabity";
const linkregex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

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
    let { link } = req.query;
    var regex = new RegExp(linkregex);
    if (
      link &&
      link.toString().match(regex) &&
      !(
        link.toString().includes("127.0.0.1") ||
        link.toString().includes("localhost") ||
        link.toString().includes("::1")
      )
    ) {
      grabity
        .grabIt(link)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((error) => {
          res.status(400).json({"status": "Bad Request Url"});
        });
    } else {
      res.status(400).json({"status": "Bad Request Url"});
    }
  }
}
