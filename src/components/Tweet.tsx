import React from "react";
import { Box, Panel, Media, Image, Button } from "react-bulma-components";
import { ITweet } from "../../interfaces/ITweet";
import * as timeago from "timeago.js";
export const Tweet = ({ tweet }: { tweet: ITweet }) => {
  return (
    <Box style={{ marginBottom: "0.3rem" }}>
      <Media>
        <Media.Item renderAs="figure" position="left">
          <Image
            rounded
            size={48}
            src={tweet.user.profile_image_url_https}
          ></Image>
        </Media.Item>
        <Media.Content style={{ wordWrap: "break-word" }}>
          <p
            style={{ wordWrap: "break-word" }}
            dangerouslySetInnerHTML={{
              __html: (() => {
                let textToDisplay = tweet.full_text;
                tweet.entities.urls
                  .map((u) => u.url)
                  .forEach((url) => {
                    textToDisplay = textToDisplay.replace(url, "");
                  });
                tweet.entities.user_mentions.forEach((mention) => {
                  textToDisplay = textToDisplay.replace(
                    `@${mention.screen_name}`,
                    `<a href='https://twitter.com/@${mention.screen_name}' target='_blank'>@${mention.screen_name}</a>`
                  );
                  // textToDisplay = textToDisplay.substring(0, mention.indices[0]) + ` <a href='/'>@${mention.screen_name}</a> ` + textToDisplay.substring(mention.indices[1], textToDisplay.length)
                });
                return textToDisplay;
              })(),
            }}
          ></p>

          {tweet.entities.urls.map((url) => {
            return (
              <Panel>
                <a href={url.expanded_url} target={"_blank"}>
                  {url.url}
                </a>
              </Panel>
            );
          })}

          <Button
            size={"small"}
            color={"white"}
            renderAs={"a"}
            href={`https://twitter.com/intent/like?tweet_id=${tweet.id_str}`}
            target={"_blank"}
          >
            <img
              width={15}
              src={
                "https://www.flaticon.com/svg/static/icons/svg/929/929417.svg"
              }
            ></img>
          </Button>
          <Button
            size={"small"}
            color={"white"}
            renderAs={"a"}
            href={`https://twitter.com/intent/retweet?tweet_id=${tweet.id_str}`}
            target={"_blank"}
          >
            <img
              width={15}
              src={
                "https://www.flaticon.com/svg/static/icons/svg/1388/1388997.svg"
              }
            ></img>
          </Button>
          <Button
            size={"small"}
            color={"white"}
            renderAs={"a"}
            href={`https://twitter.com/intent/tweet?in_reply_to=${tweet.id_str}`}
            target={"_blank"}
          >
            <img
              width={15}
              src={
                "https://www.flaticon.com/svg/static/icons/svg/937/937819.svg"
              }
            ></img>
          </Button>
          {timeago.format(tweet.created_at)}
        </Media.Content>
      </Media>
    </Box>
  );
};
