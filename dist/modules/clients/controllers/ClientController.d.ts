import { Request, Response } from 'express';
export default class ClientController {
    create(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    getClientsByCompanyId(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    update(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    delete(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
