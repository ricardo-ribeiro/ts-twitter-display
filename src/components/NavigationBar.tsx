import React from "react";
import { Navbar, Heading, Image } from "react-bulma-components";
export const NavigationBar = () => {
  return (
    <Navbar color={"link"} style={{ backgroundColor: "rgb(42,95,245)" }} active>
      <Navbar.Brand >
        <Navbar.Item renderAs="a">
          <img
            style={{ maxHeight: "2.75rem" }}
            src={"https://www.flaticon.com/svg/static/icons/svg/937/937552.svg"}
            alt="Twitt"
          />
          <span style={{ marginLeft: 5 }}>Twitt</span>
        </Navbar.Item>

        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Container position="end">
        <Navbar.Item onClick={() => window.location.reload()}>
          Refresh All Timelines
        </Navbar.Item>
      </Navbar.Container>
    </Navbar>
  );
};
