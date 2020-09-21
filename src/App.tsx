import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
// import logo from './logo.svg';
import {
  Navbar,
  Heading,
  Box,
  Columns,
  Panel,
  Level,
  Media,
  Menu,
  Loader,
  Image,
  Button,
  Container,
  Content,
  Form,
} from "react-bulma-components";
import "./App.css";
import { getTimelineForUser, getUsersForScreenName } from "./sdk";
import { ITweet, IUser } from "../interfaces/ITweet";
import * as timeago from "timeago.js";
import _ from "lodash";

const TwitterVerifierIcon = () => {
  return (
    <svg
      width={17.5}
      viewBox="0 0 24 24"
      aria-label="Verified account"
      className="r-jwli3a r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
    >
      <g>
        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
      </g>
    </svg>
  );
};

const InputWithAutoComplete = ({ onUserSelected }) => {
  let [currenScreenName, setCurrentScreenName] = useState<string>();
  let [suggestedUsers, setSuggestedUsers] = useState<IUser[]>([]);
  let inputRef = useRef<HTMLInputElement>();
  let inputControlRef = useRef<HTMLInputElement>();
  let getDebounced = useCallback(
    _.debounce(() => {
      inputControlRef.current?.classList.toggle("is-loading");
      getUsersForScreenName(
        inputRef.current ? inputRef.current.value : ""
      ).then((r) => {
        setSuggestedUsers(r);
        inputControlRef.current?.classList.toggle("is-loading");
      });
    }, 150),
    [inputRef]
  );
  useEffect(currenScreenName != "" ? getDebounced : () => {}, [
    currenScreenName,
  ]);
  return (
    <>
      <Form.Control domRef={inputControlRef}>
        <Form.Input
          domRef={inputRef}
          value={currenScreenName}
          onChange={(evt) => {
            setSuggestedUsers([]);
            setCurrentScreenName(evt.target.value);
          }}
        ></Form.Input>
      </Form.Control>

      {suggestedUsers.length > 0 ? (
        <Box
          style={{
            position: "absolute",
            zIndex: 999,
            maxHeight: "80vh",
            overflowY: "scroll",
          }}
        >
          {suggestedUsers.map((suser) => {
            return (
              <div key={suser.id_str}>
                {suser.following ? <small>Following</small> : null}
                <Media>
                  <Media.Item renderAs="figure" position="left">
                    <Image
                      size={48}
                      rounded
                      src={suser.profile_image_url_https}
                    ></Image>
                  </Media.Item>
                  <Media.Item>
                    <div style={{ display: "flex", verticalAlign: "middle" }}>
                      <div>
                        <strong>{suser.name}</strong>
                      </div>
                      {suser.verified ? (
                        <div style={{ paddingTop: 3 }}>
                          <TwitterVerifierIcon />
                        </div>
                      ) : null}
                    </div>
                    @{suser.screen_name}
                  </Media.Item>
                  <Media.Item renderAs="figure" position="left">
                    <Button
                      onClick={() => {
                        setCurrentScreenName("");
                        setSuggestedUsers([]);
                        onUserSelected(suser);
                      }}
                    >
                      Add to Timeline
                    </Button>
                  </Media.Item>
                </Media>
                <hr style={{ margin: 7 }}></hr>
              </div>
            );
          })}
        </Box>
      ) : null}
    </>
  );
};

function App() {
  let [timelines, setTimelines] = useState<any[]>([]);
  return (
    <div className="App">
      <header>
        <Navbar style={{ backgroundColor: "rgb(42,95,245)" }}>
          <Navbar.Brand renderAs="figure">
            <Level style={{ paddingLeft: 5 }}>
              <Level.Item>
                <Image
                  size={32}
                  src={
                    "https://www.flaticon.com/svg/static/icons/svg/937/937552.svg"
                  }
                ></Image>
              </Level.Item>
              <Level.Item>
                <Heading style={{ color: "white" }}> Twitt</Heading>
              </Level.Item>
            </Level>
          </Navbar.Brand>
        </Navbar>
      </header>
      <main style={{ backgroundColor: "#fafafa" }}>
        {/* <Container> */}
        <Columns multiline={false}>
          <Columns.Column size={2} style={{ borderRightStyle: "inset" }}>
            <Menu style={{ marginLeft: 10, height: "calc(100vh - 70px)" }}>
              <br></br>
              <Menu.List title="Search Users">
                <InputWithAutoComplete
                  onUserSelected={(surser) =>
                    setTimelines((ct) => [...ct, surser])
                  }
                ></InputWithAutoComplete>
                {timelines.map((timeline) => {
                  return (
                    <Menu.List.Item>
                      <Media>
                        <Media.Item renderAs="figure" position="left">
                          <Image
                            size={48}
                            rounded
                            src={timeline.profile_image_url_https}
                          ></Image>
                        </Media.Item>
                        <Media.Item>
                          <div
                            style={{ display: "flex", verticalAlign: "middle" }}
                          >
                            <div>
                              <strong>{timeline.name}</strong>
                            </div>
                            {timeline.verified ? (
                              <div style={{ paddingTop: 3 }}>
                                <TwitterVerifierIcon />
                              </div>
                            ) : null}
                          </div>
                          @{timeline.screen_name}
                        </Media.Item>
                      </Media>
                    </Menu.List.Item>
                  );
                })}
              </Menu.List>
            </Menu>
          </Columns.Column>
          <Columns.Column size={10}>
            <Columns
              multiline={false}
              style={{
                overflowX: "scroll",
                height: "calc(100vh - 50px)",
                overflowY: "scroll",
              }}
              variableGap={{
                mobile: 1,
                tablet: 1,
                desktop: 2,
                widescreen: 2,
                fullhd: 2,
              }}
            >
              {timelines.map((timeline, index) => {
                return (
                  <TimelineContainer timeline={timeline}></TimelineContainer>
                );
              })}
            </Columns>
          </Columns.Column>
        </Columns>
        {/* </Container> */}
      </main>
      <footer></footer>
    </div>
  );
}

export default App;

const TimelineContainer = ({ timeline }) => {
  let [requestTime, setRequestTime] = useState(Date.now());
  return (
    <Columns.Column size={4} gap={1}>
      <Box>
        <Media>
          {/* <Media.Item renderAs="figure" position="left">
          <Image
            size={48}
            rounded
            src={timeline.profile_image_url_https}
          ></Image>
        </Media.Item> */}
          <Media.Item>
            <div style={{ display: "flex", verticalAlign: "middle" }}>
              <div>
                <strong>{timeline.name}</strong>
              </div>
              {timeline.verified ? (
                <div style={{ paddingTop: 3 }}>
                  <TwitterVerifierIcon />
                </div>
              ) : null}
            </div>
            @{timeline.screen_name}
            <br></br>
            {timeline.description}
          </Media.Item>
          <Media.Item position="left">
            <Button
              renderAs={"a"}
              size={"small"}
              color={"white"}
              title={`Refresh to get up to date tweets for ${timeline.name}`}
              onClick={() => {
                setRequestTime(Date.now());
              }}
            >
              <img
                width={18}
                src={
                  "https://www.flaticon.com/svg/static/icons/svg/545/545661.svg"
                }
              ></img>
            </Button>
          </Media.Item>
        </Media>
      </Box>
      <Timeline userId={timeline.id_str} requestEpoch={requestTime}></Timeline>
    </Columns.Column>
  );
};

const Timeline = ({ userId = "2938471462", requestEpoch = Date.now() }) => {
  let [tweets, setTweets] = useState<ITweet[]>();
  let [loadEpoch, setLoadEpoch] = useState<any>(null);
  useEffect(() => {
    getTimelineForUser(userId).then((tweets: ITweet[]) => {
      setTweets(tweets);
      setLoadEpoch(Date.now());
    });
  }, [requestEpoch]);
  return (
    <>
      {loadEpoch ? null : <Loader></Loader>}
      {tweets?.map((tweet: ITweet) => {
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
                {/* {tweet.full_text} */}
                {tweet.entities.urls.map((url) => {
                  return (
                    <Panel>
                      <a href={url.expanded_url} target={"_blank"}>
                        {url.url}
                      </a>
                    </Panel>
                  );
                })}
                {/* {tweet.entities.urls.length} */}

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
      })}
    </>
  );
};
