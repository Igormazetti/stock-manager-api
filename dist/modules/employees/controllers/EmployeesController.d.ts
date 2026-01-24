import { Request, Response } from 'express';
export default class EmployeeController {
    getEmployees(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    create(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    update(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    delete(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
