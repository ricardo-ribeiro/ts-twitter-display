import React, { useEffect, useState } from "react";
import { Loader } from "react-bulma-components";
import { getTimelineForUser } from "../sdk";
import { ITweet } from "../../interfaces/ITweet";
import { Tweet } from "./Tweet";

export const Timeline = ({
  userId = "2938471462",
  requestEpoch = Date.now(),
}) => {
  let [tweets, setTweets] = useState<ITweet[]>();
  let [loadEpoch, setLoadEpoch] = useState<any>(null);
  useEffect(() => {
    getTimelineForUser(userId)
      .then((tweets: ITweet[]) => {
        setTweets(tweets);
        setLoadEpoch(Date.now());
      })
      .catch((e) => {
        console.error("Error Loading Timeline");
        setLoadEpoch(Date.now())
      });
  }, [requestEpoch]);
  return (
    <div style={{ overflowY: "scroll" }}>
      {loadEpoch ? null : <Loader></Loader>}
      {tweets?.map((tweet: ITweet) => {
        return <Tweet tweet={tweet}></Tweet>;
      })}
    </div>
  );
};
