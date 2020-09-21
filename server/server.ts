import * as dotenv from "dotenv";
import express from "express";
import TwitterClient from "twitter";
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

const app: express.Application = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.get(
  "/api/tweets/:user_id",
  (req: express.Request, res: express.Response) => {
    let { user_id }  = req.params;
    twittClient
      .get("statuses/user_timeline", { user_id: user_id,tweet_mode:'extended' })
      .then((tresponse: TwitterClient.ResponseData) => {
        res.json(tresponse);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

app.get(
  "/api/twitter/user/:screen_name",
  (req: express.Request, res: express.Response) => {
    let { screen_name }  = req.params;
    twittClient
    .get("users/search", { q: screen_name.replace("@", "") })
      .then((tresponse: TwitterClient.ResponseData) => {
        res.json(tresponse);
      })
      .catch((error) => {
        console.log(error);
        if(error.code === "ETIMEDOUT"){
          res.send(408).json({status:"Timed out"})
        }else{
          res.send(400).json({status:"Error with request"})
        }
      });
  }
);

if (process.env.NODE_ENV === "production") {
  // We are running in production mode
  console.log("Running Production");
} else {
  // We are running in development mode
  console.log("Running Dev");
}

app.listen(9990, () => {
  console.log("Example app listening on port 9990!");
});
