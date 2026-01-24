import { Request, Response } from 'express';
export default class ProductController {
    create(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    getProductByCompanyId(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    update(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
