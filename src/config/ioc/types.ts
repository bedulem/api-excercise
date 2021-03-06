export const TYPES = {
    // utils
    ConnectionManager: Symbol.for("ConnectionManager"),

    //repository
    UserRepository: Symbol.for("UserRepository"),
    ReportRepository: Symbol.for("ReportRepository"),

    //service
    CreateUserService: Symbol.for("CreateUserService"),
    UpdateUserService: Symbol.for("UpdateUserService"),
    CreateReportService: Symbol.for("CreateReportService"),
    UpdateReportService: Symbol.for("UpdateReportService"),

    //middleware
    AuthorizationMiddleware: Symbol.for("AuthorizationMiddleware"),
};
