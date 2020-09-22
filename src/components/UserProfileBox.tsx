import React from "react";
import { Box, Media, Button } from "react-bulma-components";
import { TwitterVerifierIcon } from "./TwitterVerifierIcon";
import { IUser } from "../../interfaces/ITweet";
export const UserProfileBox = ({
  user,
  update,
}: {
  user: IUser;
  update: Function;
}) => {
  return (
    <Box>
      <Media>
        <Media.Item>
          <div style={{ display: "flex", verticalAlign: "middle" }}>
            <div>
              <strong>{user.name}</strong>
            </div>
            {user.verified ? (
              <div style={{ paddingTop: 3 }}>
                <TwitterVerifierIcon />
              </div>
            ) : null}
          </div>
          @{user.screen_name}
          <br></br>
          {user.description}
        </Media.Item>
        <Media.Item position="left">
          <Button
            renderAs={"a"}
            size={"small"}
            color={"white"}
            title={`Refresh to get up to date tweets for ${user.name}`}
            onClick={() => {
              update(Date.now());
            }}
          >
            <img
              width={15}
              src={
                "https://www.flaticon.com/svg/static/icons/svg/545/545661.svg"
              }
            ></img>
          </Button>
        </Media.Item>
      </Media>
    </Box>
  );
};
