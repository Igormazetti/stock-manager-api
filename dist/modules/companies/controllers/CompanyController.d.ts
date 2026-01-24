import { Request, Response } from 'express';
export default class CompanyController {
    create(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    login(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    resetPassword(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    update(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    get(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
