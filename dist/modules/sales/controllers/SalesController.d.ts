import { Request, Response } from 'express';
export default class SalesController {
    create(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    getAll(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    update(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
