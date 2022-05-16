import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpDelete, request, response } from "inversify-express-utils";
import { TYPES } from "../../config/ioc/types";
import { User } from "../../entity/User";
import { IUserRepository } from "../../repository/UserRepository";
import { deleteUserValidator } from "../../validator/deleteUserValidator";

@controller("/users")
export class DeleteUserController extends BaseHttpController {
    @inject(TYPES.UserRepository) private readonly userRepository: IUserRepository;

    @httpDelete("/:id", ...deleteUserValidator, TYPES.AuthorizationMiddleware)
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const user: User | null = await this.userRepository.findOneById(request.params.id);
        if (user === null) {
            return response.status(404).send({ error: `User with id ${request.params.id} not found` });
        }

        await this.userRepository.remove(user);

        return response.status(204).send();
    }
}
