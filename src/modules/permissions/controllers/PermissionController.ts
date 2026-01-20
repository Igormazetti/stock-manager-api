import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GetPermissionsService from '../services/GetPermissions.service';

export default class PermissionController {
  public async getAll(_request: Request, response: Response) {
    const service = container.resolve(GetPermissionsService);
    const result = await service.execute();

    return response.status(result.status).json(result);
  }
}
