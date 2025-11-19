import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { object, string, number } from 'yup';
import GetNotificationsService from '../services/GetNotifications.service';
import MarkNotificationAsReadService from '../services/MarkNotificationAsRead.service';

const GetNotificationsSchema = object({
  skip: number().optional().default(0),
  take: number().optional().default(50),
});

export default class NotificationsController {
  public async getAll(request: Request, response: Response) {
    const { skip, take } = await GetNotificationsSchema.validate(request.query);
    const companyId = request.company.id;

    const getNotificationsService = container.resolve(GetNotificationsService);

    const result = await getNotificationsService.execute(companyId, Number(skip), Number(take));

    return response.status(result.status).json(result);
  }

  public async markAsRead(request: Request, response: Response) {
    const { id } = request.params;

    const markNotificationAsReadService = container.resolve(MarkNotificationAsReadService);

    const result = await markNotificationAsReadService.execute(id);

    return response.status(result.status).json(result);
  }
}
