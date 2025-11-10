import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { object, string } from 'yup';
import CreateClientService from '../services/CreateClient.service';
import UpdateClientService from '../services/UpdateClient.service';
import DeleteClientService from '../services/DeleteClient.service';
import GetClientsByCompanyIdService from '../services/GetClientsByCompanyId.service';

const CreateClientSchema = object({
  name: string().required(),
  email: string().email(),
  address: string().required(),
  observations: string(),
});

const UpdateClientSchema = object({
  name: string(),
  email: string().email(),
  address: string(),
  observations: string(),
});

export default class ClientController {
  public async create(request: Request, response: Response) {
    const { name, email, address, observations } =
      await CreateClientSchema.validate(request.body);
    const createClientService = container.resolve(CreateClientService);
    const companyId = request.company.id;

    const client = await createClientService.execute({
      name,
      email,
      address,
      observations,
      companyId,
    });

    return response.status(client.status).json(client);
  }

  public async getClientsByCompanyId(request: Request, response: Response) {
    const { skip, name } = request.query;
    const companyId = request.company.id;

    const getClientsByCompanyIdService = container.resolve(
      GetClientsByCompanyIdService,
    );
    const clients = await getClientsByCompanyIdService.execute(
      companyId,
      Number(skip),
      name as string || undefined,
    );

    return response.status(clients.status).json(clients);
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;

    const { name, email, address, observations } =
      await UpdateClientSchema.validate(request.body);
    const updateClientService = container.resolve(UpdateClientService);

    const update = await updateClientService.execute({
      clientId: id,
      name,
      email,
      address,
      observations,
    });

    return response.status(update.status).json(update);
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deleteClientService = container.resolve(DeleteClientService);

    const result = await deleteClientService.execute({
      clientId: id,
    });

    return response.status(result.status).json(result);
  }
}
