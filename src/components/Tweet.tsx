import React from "react";
import {
  Box,
  Panel,
  Media,
  Image,
  Button,
} from "react-bulma-components";
import { ITweet } from "../../interfaces/ITweet";
import * as timeago from "timeago.js";
import { MetaLink } from "./MetaLink";

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
        <span><small><time dateTime={new Date(tweet.created_at).toUTCString()}>{timeago.format(tweet.created_at)}</time></small></span>
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
                if (tweet.entities && tweet.entities.media)
                  tweet.entities.media
                    .map((u) => u.url)
                    .forEach((url) => {
                      textToDisplay = textToDisplay.replace(url, "");
                    });

                tweet.entities.user_mentions.forEach((mention) => {
                  textToDisplay = textToDisplay.replace(
                    `@${mention.screen_name}`,
                    `<a href='https://twitter.com/@${mention.screen_name}' target='_blank'>@${mention.screen_name}</a>`
                  );
                });
                tweet.entities.hashtags.forEach((hashtag) => {
                  textToDisplay = textToDisplay.replace(
                    `#${hashtag.text}`,
                    `<a href='https://twitter.com/hashtag/${encodeURIComponent(
                      hashtag.text
                    )}' target='_blank'>#${encodeURIComponent(
                      hashtag.text
                    )}</a>`
                  );
                });
                return textToDisplay;
              })(),
            }}
          ></p>
          {tweet.entities.urls.map((url) => {
            return <MetaLink url={url}></MetaLink>;
          })}
          {tweet.extended_entities
            ? tweet.extended_entities.media.map((media) => {
                return media.type === "video" ? (
                  <video
                    style={{ borderRadius: 10 }}
                    controls
                    poster={media.media_url_https}
                    src={media.video_info.variants[0].url}
                  ></video>
                ) : (
                  <figure className="image">
                    <img
                      style={{ borderRadius: 10 }}
                      src={media.media_url_https}
                    />
                  </figure>
                );
              })
            : null}

          <br></br>
          <Button
            size={"small"}
            color={"white"}
            renderAs={"a"}
            href={`https://twitter.com/intent/tweet?in_reply_to=${tweet.id_str}`}
            target={"_blank"}
          >
           <svg viewBox="0 0 24 24" width={15}><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
           {/* <small style={{marginLeft:4}}>{}</small> */}

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
            <small style={{marginLeft:4}}>{tweet.retweet_count}</small>
          </Button>
          <Button
            size={"small"}
            color={"white"}
            renderAs={"a"}
            href={`https://twitter.com/intent/like?tweet_id=${tweet.id_str}`}
            target={"_blank"}
          >
           <svg viewBox="0 0 24 24" width={15}><g><path fill={tweet.favorited ? "red" : "black"} d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
           <small style={{marginLeft:4}}>{tweet.favorite_count}</small>

          </Button>
          
          
        </Media.Content>
      </Media>
    </Box>
  );
};
