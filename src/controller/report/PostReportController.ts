import { inject } from "inversify";
import { TYPES } from "../../config/ioc/types";
import { ICreateReportDto, ICreateReportService } from "../../service/report/CreateReportService";
import { BaseHttpController, controller, httpPost, request, response } from "inversify-express-utils";
import { Request, Response } from "express";
import { Report } from "../../entity/Report";
import { IUserRepository } from "../../repository/UserRepository";
import { User } from "../../entity/User";

@controller('/reports')
export class PostReportController extends BaseHttpController {  @inject(TYPES.CreateReportService) private readonly     createReportService: ICreateReportService;
    // @inject(TYPES.UserRepository) private readonly userRepository: IUserRepository;

    @httpPost("/")
    public async index(@request() request: Request, @response() response: Response): Promise<Response>{

        // const users: User[] = await this.userRepository.findAllPaginated(Number(request.query.offset), Number(request.query.limit), undefined, undefined)


        // //user
        // if(users.id != request.body.userId){
        //     return response.status(400).send({error: `Sorry! Report with userId ${request.body.UserId} not found`})
        // };

        const report: Report = await this.createReportService.create(request.body as ICreateReportDto)

        return response.status(201).send(report);
    }
}
