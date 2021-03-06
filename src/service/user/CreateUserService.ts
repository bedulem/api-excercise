import { User } from "../../entity/User";
import { v4 as uuid } from "uuid";
import { IUserRepository } from "../../repository/UserRepository";
import { inject } from "inversify";
import { TYPES } from "../../config/ioc/types";
import { provideSingleton } from "../../utils/inversify/CustomProviders";

export interface IcreateUserDto {
    email: string;
    name: string;
    age: number;
    country: string;
}

export interface ICreateUserService {
    create(dto: IcreateUserDto): Promise<User>;
}

@provideSingleton(TYPES.CreateUserService)
export class CreateUserService implements ICreateUserService {
    private readonly userRepository: IUserRepository;

    constructor(@inject(TYPES.UserRepository) userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async create({ email, name, age, country }: IcreateUserDto): Promise<User> {
        const timestamp = (Date.now() / 1000) | 0;

        const user: User = {
            id: uuid(),
            email,
            name,
            age,
            country,
            createdAT: timestamp,
            updatedAT: timestamp,
        };

        await this.userRepository.persist(user);

        return user;
    }
}
