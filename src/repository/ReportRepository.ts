import { inject } from "inversify";
import { TYPES } from "../config/ioc/types";
import { Report } from "../entity/Report";
import { provideSingleton } from "../utils/inversify/CustomProviders";
import { IConnectionManager } from "../utils/mongodb/ConnectionManager";
import { MongoRepository } from "../utils/mongodb/MongoRepository";

export interface IReportRepository{
    persist(report: Report): Promise<void>;
    findAllReports(userId?: string, dateFrom?: number, dateTo?: number): Promise<Report[]>;
}

const collectionName: string = "report";

@provideSingleton(TYPES.ReportRepository)
export class ReportRepository extends MongoRepository implements IReportRepository{
    constructor(@inject(TYPES.ConnectionManager) ConnectionManager: IConnectionManager){
        super();

        this.collection = ConnectionManager.getCollection(collectionName)
    }


    public async findAllReports(userId?: string, dateFrom?: number, dateTo?: number): Promise<Report[]>{
        const filter: {[key: string]: unknown} = {};

        if(userId){
            filter.userId = userId;
        }
        if(dateFrom && dateTo){
            filter.createdAT = $and[{createedAT: {$gte: dateFrom},
                createdAT: {$lte: dateTo}
                }]

        }else if(dateFrom){
            filter.createdAT = {$gte : dateFrom};
        }else if(dateTo){
            filter.createdAT = {$lte : dateTo};
        }

        
        return await this.findBy(filter, null, null, null);
    }
}

/*find({userId: "asdasdqwe1231",
        $and[{createedAT: {$gte: 112231},
            createdAT: {$lte: 1224235}
            }]
        }) */
