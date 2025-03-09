"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import usersService from './app/modules/users/users.service'
// import { errorlogger } from './shared/logger'
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const http_status_1 = __importDefault(require("http-status"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import ApiError from './errors/ApiError'
const app = (0, express_1.default)();
// const port = 3000
// middleware
app.use((0, cors_1.default)());
// parser
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Application ENV
// console.log(app.get('env'))
// Application routers
app.use('/api/v1', routes_1.default);
// app.use('/api/v1/users', UserRoutes)
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes)
//Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // await usersService.createUser({
//   //   id: '999',
//   //   password: '12345',
//   //   role: 'student',
//   // })
//   res.send('Working Successfully!')
//   // throw new ApiError(400, 'Ora Baba Error')
//   // Promise.reject(new Error('Unhandled Promise Error'))
//   // console.log(x)
//   // next('Ora Baba Error')
// })
// Error handling middleware
app.use(globalErrorHandler_1.default);
// Handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Route not found',
        errorMessage: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    if (!res.headersSent) {
        next();
    }
});
exports.default = app;
