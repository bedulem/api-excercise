import { NextFunction, Request, Response } from "express";
import { BaseMiddleware } from "inversify-express-utils";
import { TYPES } from "../config/ioc/types";
import { Exception } from "../exception/Exception";
import { provideSingleton } from "../utils/inversify/CustomProviders";

const token: string = "123456";

@provideSingleton(TYPES.AuthorizationMiddleware)
export class authorizationMiddleware extends BaseMiddleware {
    public handler(request: Request, response: Response, next: NextFunction): void {
        // if (request.body.token) {
        //     request.body.token = String(request.body.country).toUpperCase();
        // }

        if (request.headers.authorization != token) {
            next(new Exception("Invalid Token", 401));
        }

        //  how to throw an error inside a middleware
        /*if (request.body.country && request.body.country === String(request.body.country).toLocaleLowerCase()) {
            next(new Exception("Bad country", 400));
        }*/

        next();
    }
}
