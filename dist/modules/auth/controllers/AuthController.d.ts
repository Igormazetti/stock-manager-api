import { Request, Response } from 'express';
export default class AuthController {
    loginCompany(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    loginEmployee(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
