import { inject } from "inversify";
import { TYPES } from "../../config/ioc/types";
import { User } from "../../entity/User";
import { ServiceValidationException } from "../../exception/ServiceValidationException";
import { IUserRepository } from "../../repository/UserRepository";
import { provideSingleton } from "../../utils/inversify/CustomProviders";

export interface IUpdateUserDto {
    name: string;
    age: number;
    country: string;
}

export interface IUpdateUserService {
    update(user: User, dto: IUpdateUserDto): Promise<User>;
}

@provideSingleton(TYPES.UpdateUserService)
export class UpdateUserService implements IUpdateUserService{
    private readonly userRepository: IUserRepository;

    constructor(@inject(TYPES.UserRepository) userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    public async update(user: User, {name, age, country}: IUpdateUserDto): Promise<User> {
        if(age <12){
            throw new ServiceValidationException("Invalid age, useres need to be older than 12");
        }
        
        user.name = name;
        user.age = age;
        user.country = country;
        user.updatedAT = (Date.now()/1000) | 0;

        await this.userRepository.persist(user);

        return user;
    }
}
