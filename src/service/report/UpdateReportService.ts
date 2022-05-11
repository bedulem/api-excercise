import { inject } from "inversify";
import { TYPES } from "../../config/ioc/types";
import { Report } from "../../entity/Report";
import { ServiceValidationException } from "../../exception/ServiceValidationException";
import { IReportRepository } from "../../repository/ReportRepository";
import { provideSingleton } from "../../utils/inversify/CustomProviders";

export interface IUpdateReportDto {
    userId: string;
    title: string;
    content: string;
    
}

export interface IUpdateReportService {
    update(report: Report, dto: IUpdateReportDto): Promise<Report>;
}

@provideSingleton(TYPES.UpdateReportService)
export class UpdateReportService implements IUpdateReportService{
    private readonly reportRepository: IReportRepository;

    constructor(@inject(TYPES.ReportRepository) reportRepository: IReportRepository){
        this.reportRepository = reportRepository;
    }

    public async update(report: Report, {userId, title, content}: IUpdateReportDto): Promise<Report> {
        
        report.userId = userId;
        report.title = title;
        report.content = content;
        report.updatedAT = (Date.now()/1000) | 0;

        await this.reportRepository.persist(report);

        return report;
    }
}
