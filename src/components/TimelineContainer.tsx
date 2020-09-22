import React, { useState } from "react";
import { Columns } from "react-bulma-components";
import { Timeline } from "./Timeline";
import { IUser } from "../../interfaces/ITweet";
import { UserProfileBox } from "./UserProfileBox";

export const TimelineContainer = ({ user }: { user: IUser }) => {
  let [requestTime, setRequestTime] = useState(Date.now());
  return (
    <Columns.Column size={4} gap={1}>
      <UserProfileBox user={user} update={setRequestTime}></UserProfileBox>
      <Timeline userId={user.id_str} requestEpoch={requestTime}></Timeline>
    </Columns.Column>
  );
};
