import express from "express";
import { ImplBaseController } from "./impl/ImplBaseController";
import { IInjectables } from "./interfaces/IInjectables";
import { IAppServerOptions } from "./interfaces/IAppServerOptions";

export class AppServer {
  private app: express.Express;
  private port: number;
  private middlewares: [];
  private controllers: ImplBaseController[];
  private loadedControllers: ImplBaseController[];
  private injectables: IInjectables;

  constructor(
    { port }: IAppServerOptions,
    { middlewares, controllers },
    injectables
  ) {
    this.app = express();
    this.port = port;
    this.middlewares = middlewares;
    this.controllers = controllers;
    this.injectables = injectables;

    this.middlewares.forEach(middleware=>{
        this.app.use(middleware);
    })
    this.loadedControllers = this.controllers.map((Controller: any) => {
      return new Controller(this.injectables, this.app);
    });
    // this.start();
  }
  public addHandler(method: string, path: string, handler: Function): void {
    this.app[method](
      path,
      handler.bind({ injectables: this.injectables, app: this.app })
    );
  }
  public getApp(): express.Express {
    return this.app;
  }
  public start(): void {
    this.app.listen(this.port, () => {
      console.log("app Started");
    });
  }
}
