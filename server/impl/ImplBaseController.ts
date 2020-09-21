import express from "express";
import { IInjectables } from "../interfaces/IInjectables";
import { IController } from "../interfaces/IController";

export abstract class ImplBaseController implements IController {
    injectables: IInjectables;
    app: express.Application;
    constructor(injectables: IInjectables, app: express.Application) {
        this.app = app;
        this.injectables = injectables;
    }
    registerHandler(method: string, path: string, handler: Function): void {
        this.app[method](path, handler.bind(this));
    }
    handler(req: express.Request, res: express.Response): void {
        throw new Error("Handler Method not implemented.");
    }
}
