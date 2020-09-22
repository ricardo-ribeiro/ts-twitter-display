import React, { useEffect, useState, useCallback, useRef } from "react";
import { Box, Media, Image, Button, Form } from "react-bulma-components";
import { getUsersForScreenName } from "../sdk";
import { IUser } from "../../interfaces/ITweet";
import _ from "lodash";
import { TwitterVerifierIcon } from "./TwitterVerifierIcon";
export const InputWithAutoComplete = ({ onUserSelected }) => {
  let [currenScreenName, setCurrentScreenName] = useState<string>();
  let [suggestedUsers, setSuggestedUsers] = useState<IUser[]>([]);
  let inputRef = useRef<HTMLInputElement>();
  let inputControlRef = useRef<HTMLInputElement>();
  let getDebounced = useCallback(
    _.debounce(() => {
      if (inputRef.current && inputRef.current.value !== "") {
        inputControlRef.current?.classList.toggle("is-loading");
        getUsersForScreenName(inputRef.current.value).then((r) => {
          setSuggestedUsers(r);
          inputControlRef.current?.classList.toggle("is-loading");
        });
      }
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
                      Add Timeline
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
