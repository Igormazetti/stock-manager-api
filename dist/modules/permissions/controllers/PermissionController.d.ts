import { Request, Response } from 'express';
export default class PermissionController {
    getAll(_request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
