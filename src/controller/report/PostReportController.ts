import { inject } from "inversify";
import { TYPES } from "../../config/ioc/types";
import { ICreateReportDto, ICreateReportService } from "../../service/report/CreateReportService";
import { BaseHttpController, controller, httpPost, request, response } from "inversify-express-utils";
import { Request, Response } from "express";
import { Report } from "../../entity/Report";
import { postReportValidator } from "../../validator/postReportValidator";

@controller("/reports")
export class PostReportController extends BaseHttpController {
    @inject(TYPES.CreateReportService) private readonly createReportService: ICreateReportService;

    @httpPost("/", ...postReportValidator, TYPES.AuthorizationMiddleware)
    public async index(@request() request: Request, @response() response: Response): Promise<Response> {
        const report: Report = await this.createReportService.create(request.body as ICreateReportDto);

        return response.status(201).send(report);
    }
}
