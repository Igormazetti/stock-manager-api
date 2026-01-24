import { Request, Response } from 'express';
export default class NotificationsController {
    getAll(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    markAsRead(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
