import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { PARAMETERS } from "../config/ioc/parameters";
import { TYPES } from "../config/ioc/types";
import { Exception } from "../exception/Exception";
import { provideSingleton } from "../utils/inversify/CustomProviders";

@provideSingleton(TYPES.AuthorizationMiddleware)
export class AuthorizationMiddleware extends BaseMiddleware {
    @inject(PARAMETERS.token) private readonly token: string;

    public handler(request: Request, response: Response, next: NextFunction): void {
        if (!request.headers.authorization || request.headers.authorization != this.token) {
            next(new Exception("Invalid Token", 401));
        }

        next();
    }
}
