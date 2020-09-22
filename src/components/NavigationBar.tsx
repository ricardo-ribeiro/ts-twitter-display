import React from "react";
import { Navbar, Heading, Level, Image } from "react-bulma-components";
export const NavigationBar = () => {
  return (
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
  );
};
