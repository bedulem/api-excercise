import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, request, response } from "inversify-express-utils";
import { TYPES } from "../../config/ioc/types";
import { Report } from "../../entity/Report";
import { IReportRepository } from "../../repository/ReportRepository";
import { getReportsValidator } from "../../validator/getReportsValidator";

@controller("/reports")
export class GetReportsController extends BaseHttpController {
    @inject(TYPES.ReportRepository) private readonly reportRepository: IReportRepository;

    @httpGet("/", ...getReportsValidator)
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const report: Report[] = await this.reportRepository.findAllReports(
            request.query.userId?.toString(),
            Number(request.query.dateFrom),
            Number(request.query.dateTo)
        );

        return response.status(200).send(report);
    }
}
