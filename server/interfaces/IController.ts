import express from "express";
import { IInjectables } from "./IInjectables";

export interface IController {
    app: express.Application;
    injectables: IInjectables;
    registerHandler(method: string, path: string, handler: Function): void;
    handler(req: express.Request, res: express.Response): void;
}
