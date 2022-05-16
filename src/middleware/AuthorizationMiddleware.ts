import { NextFunction, Request, Response } from "express";
import { BaseMiddleware } from "inversify-express-utils";
import { TYPES } from "../config/ioc/types";

@provideSingleton(TYPES.AuthorizationMiddleware)
export class authorizationMiddleware extends BaseMiddleware {
    public handler(request: Request, response: Response, next: NextFunction): void {
        if (request.body.country) {
            request.body.country = String(request.body.country).toUpperCase();
        }

        //  how to throw an error inside a middleware
        /*if (request.body.country && request.body.country === String(request.body.country).toLocaleLowerCase()) {
            next(new Exception("Bad country", 400));
        }*/

        next();
    }
}
