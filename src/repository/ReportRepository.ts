import { inject } from "inversify";
import { TYPES } from "../config/ioc/types";
import { Report } from "../entity/Report";
import { provideSingleton } from "../utils/inversify/CustomProviders";
import { IConnectionManager } from "../utils/mongodb/ConnectionManager";
import { MongoRepository } from "../utils/mongodb/MongoRepository";

export interface IReportRepository {
    persist(report: Report): Promise<void>;
    findAllReports(userId?: string, dateFrom?: number, dateTo?: number): Promise<Report[]>;
    findOneById(id: string): Promise<Report | null>;
    remove(report: Report): Promise<void>;
}

const collectionName: string = "report";

@provideSingleton(TYPES.ReportRepository)
export class ReportRepository extends MongoRepository implements IReportRepository {
    constructor(@inject(TYPES.ConnectionManager) ConnectionManager: IConnectionManager) {
        super();

        this.collection = ConnectionManager.getCollection(collectionName);
    }

    public async findAllReports(userId?: string, dateFrom?: number, dateTo?: number): Promise<Report[]> {
        const filter: { [key: string]: unknown } = {};
        if (dateFrom && dateTo) {
            filter.createdAT = { $gte: dateFrom, $lte: dateTo };
        } else if (dateFrom) {
            filter.createdAT = { $gte: dateFrom };
        } else if (dateTo) {
            filter.createdAT = { $lte: dateTo };
        }
        if (userId) {
            filter.userId = userId;
        }

        return await this.findBy(filter, null, null, null);
    }

    public async findOneById(id: string): Promise<Report | null> {
        return await this.findOneBy<Report>({ id });
    }
}
