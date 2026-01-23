import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { array, number, object, string } from 'yup';
import CreateRoleService from '../services/CreateRole.service';
import DeleteRoleService from '../services/DeleteRole.service';
import GetRolesService from '../services/GetRoles.service';
import UpdateRoleService from '../services/UpdateRole.service';

const CreateRoleSchema = object({
  name: string().required(),
  description: string().optional(),
  permissionIds: array().of(number().required()).required(),
});

const UpdateRoleSchema = object({
  name: string().optional(),
  description: string().optional(),
  permissionIds: array().of(number().required()).optional(),
});

export default class RoleController {
  public async getAll(request: Request, response: Response) {
    const { companyId } = request.user;

    const service = container.resolve(GetRolesService);
    const result = await service.execute(companyId);

    return response.status(result.status).json(result);
  }

  public async create(request: Request, response: Response) {
    const { companyId } = request.user;
    const data = await CreateRoleSchema.validate(request.body);

    const service = container.resolve(CreateRoleService);
    const result = await service.execute(companyId, data);

    return response.status(result.status).json(result);
  }

  public async update(request: Request, response: Response) {
    const { companyId } = request.user;
    const { id } = request.params;
    const data = await UpdateRoleSchema.validate(request.body);

    const service = container.resolve(UpdateRoleService);
    const result = await service.execute(id, companyId, data);

    return response.status(result.status).json(result);
  }

  public async delete(request: Request, response: Response) {
    const { companyId } = request.user;
    const { id } = request.params;

    const service = container.resolve(DeleteRoleService);
    const result = await service.execute(id, companyId);

    return response.status(result.status).json(result);
  }
}
