import React, { useState } from "react";
import { Columns, Media, Menu, Image, Button } from "react-bulma-components";
import "./App.css";
import { InputWithAutoComplete } from "./components/InputWithAutoComplete";
import { TwitterVerifierIcon } from "./components/TwitterVerifierIcon";
import { TimelineContainer } from "./components/TimelineContainer";
import { NavigationBar } from "./components/NavigationBar";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { IUser } from "../interfaces/ITweet";

function App() {
  let [userTimeline, setUserTimeline]: [IUser[], Function] = useLocalStorage(
    "tw_users",
    []
  );
  return (
    <div className="App">
      <header>
        <NavigationBar></NavigationBar>
      </header>
      <main style={{ backgroundColor: "#fafafa" }}>
        <Columns multiline={false}>
          <Columns.Column size={2} style={{ borderRightStyle: "inset" }}>
            <Menu
              style={{
                marginLeft: 10,
                height: "calc(100vh - 70px)",
                overflowY: "scroll",
              }}
            >
              {/* <br></br> */}
              <hr></hr>
              <Menu.List title="Search Users">
                <InputWithAutoComplete
                  onUserSelected={(surser) =>
                    setUserTimeline((ct) => [...ct, surser])
                  }
                ></InputWithAutoComplete>
              </Menu.List>
              <Menu.List title={"Timelines"}>
                {userTimeline.map((timeline) => {
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
                        <Media.Item position="right">
                          <Button
                            size={"small"}
                            color={"white"}
                            onClick={() => {
                              setUserTimeline(
                                userTimeline.filter((t) => t.id !== timeline.id)
                              );
                            }}
                          >
                            X
                          </Button>
                        </Media.Item>
                      </Media>
                    </Menu.List.Item>
                  );
                })}
              </Menu.List>
            </Menu>
          </Columns.Column>
          <Columns.Column size={10}>
            <div
              style={{
                overflowX: "scroll",
                height: "calc(100vh - 64px)",
                width: "100%",
                overflowY: "scroll",
              }}
            >
              <Columns
                multiline={false}
                variableGap={{
                  mobile: 1,
                  tablet: 1,
                  desktop: 2,
                  widescreen: 2,
                  fullhd: 2,
                }}
              >
                {userTimeline.map((user, index) => {
                  return <TimelineContainer user={user}></TimelineContainer>;
                })}
              </Columns>
            </div>
          </Columns.Column>
        </Columns>
      </main>
      <footer></footer>
    </div>
  );
}
export default App;
