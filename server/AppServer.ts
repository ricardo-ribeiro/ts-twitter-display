import express from "express";

class AppServer {
  private app: express.Express;
  constructor() {
    this.app = express();
  }
  getApp() : express.Express {
    return this.app;
  }
}



new AppServer()