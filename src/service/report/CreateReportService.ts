import { inject } from "inversify";
import { TYPES } from "../../config/ioc/types";
import { Report } from "../../entity/Report";
import { IReportRepository } from "../../repository/ReportRepository";
import { provideSingleton } from "../../utils/inversify/CustomProviders";
import { v4 as uuid } from "uuid";
import { IUserRepository } from "../../repository/UserRepository";
import { User } from "../../entity/User";
import { ServiceValidationException } from "../../exception/ServiceValidationException";



export interface ICreateReportDto {
    userId: string;
    title: string;
    content: string;
}

export interface ICreateReportService {
    create(dto: ICreateReportDto): Promise<Report>
}

@provideSingleton(TYPES.CreateReportService)
export class CreateReportService implements ICreateReportService {
    private readonly reportRepository: IReportRepository;


    constructor(@inject(TYPES.ReportRepository) reportRepository: IReportRepository){
        this.reportRepository = reportRepository;
    }

    @inject(TYPES.UserRepository) private readonly userRepository: IUserRepository;

    public async create({userId, title, content}: ICreateReportDto): Promise<Report> {

        const user: User  | null = await this.userRepository.findOneById(userId)
        if(user === null){
            throw new ServiceValidationException(`User with id ${userId} not found`);
        }
        
        const timestamp = (Date.now()/1000) | 0;

        const report: Report = {
            id: uuid(),
            userId,
            title,
            content,
            createdAT: timestamp,
            updatedAT: timestamp

        };

        await this.reportRepository.persist(report);

        return report;
    }


}
