import "ts-jest";
require("dotenv").config();
import server from "./Server";
import request from "supertest";

describe("Twitter Integration", () => {
  it("should get Tweets for user_id", async function () {
    let response = await request(server.getApp())
      .get("/api/tweets/1451773004")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(response.body[0]).toHaveProperty(
      "user.screen_name",
      "Space_Station"
    );
    expect(response.body[0]).toHaveProperty("user.id_str", "1451773004");
  });
  it("should search twitter for screen_name", async function () {
    let response = await request(server.getApp())
      .get("/api/twitter/user/elonmusk")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(response.body[0]).toHaveProperty("screen_name", "elonmusk");
  });
});
describe("Url Open Data", () => {
  it("should get Url Data for URL", async function () {
    let response = await request(server.getApp())
      .get("/api/link/meta?link=https://google.com")
      .expect(200)
      .expect("Content-Type", /json/);
    expect(response.body).toHaveProperty("title", "Google");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("image");
  });
  it("should not get loopback urls", async function () {
    let response = await request(server.getApp()).get(
      "/api/link/meta?link=https://localhost:3001"
    );
    expect(response.body).toHaveProperty("status", "Bad Request Url");
  });
});
