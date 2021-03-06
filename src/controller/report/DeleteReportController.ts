import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpDelete, request, response } from "inversify-express-utils";
import { TYPES } from "../../config/ioc/types";
import { Report } from "../../entity/Report";
import { IReportRepository } from "../../repository/ReportRepository";
import { deleteReportValidator } from "../../validator/report/deleteReportValidator";

@controller("/reports")
export class DeleteReportController extends BaseHttpController {
    @inject(TYPES.ReportRepository) private readonly reportRepository: IReportRepository;

    @httpDelete("/:id", TYPES.AuthorizationMiddleware, ...deleteReportValidator)
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const report: Report | null = await this.reportRepository.findOneById(request.params.id);
        if (report === null) {
            return response.status(404).send({ error: `Report with id ${request.params.id} not found` });
        }

        await this.reportRepository.remove(report);

        return response.status(204).send();
    }
}
