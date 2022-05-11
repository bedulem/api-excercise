import { inject } from "inversify";
import { TYPES } from "../config/ioc/types";
import { User } from "../entity/User";
import { provideSingleton } from "../utils/inversify/CustomProviders";
import { IConnectionManager } from "../utils/mongodb/ConnectionManager";
import { MongoRepository } from "../utils/mongodb/MongoRepository";

export interface IUserRepository {
    persist(user: User): Promise<void>;
    findAllPaginated(offset: number, limit: number, age?: number, country?: string): Promise<User[]>;
    findOneById(id: string): Promise<User |  null>;
    remove(user: User): Promise<void>;
}

const collectionName: string = "user";

@provideSingleton(TYPES.UserRepository)
export class UserRepository extends MongoRepository implements IUserRepository{
    constructor(@inject(TYPES.ConnectionManager) ConnectionManager: IConnectionManager){
        super();

        this.collection = ConnectionManager.getCollection(collectionName)
    }

    public async findAllPaginated(offset: number, limit: number, age?: number, country?: string): Promise<User[]> {
        const filter: {[key: string]: unknown} = {};
        if(age){
            filter.age = age;
        }

        if(country){
            filter.country = country;
        }
        
        return await this.findBy(filter, null, offset, limit);
    }

    public async findOneById(id: string): Promise<User | null> {
        return await this.findOneBy<User>({ id });
    }

}
