import ClientRepository from '../repository/ClientRepository';

interface IRequest {
  clientId: string;
  name?: string;
  email?: string;
  address?: string;
  observations?: string;
}

export default class UpdateClientService {
  private clientRepository: ClientRepository;

  constructor() {
    this.clientRepository = new ClientRepository();
  }

  public async execute({
    clientId,
    name,
    email,
    address,
    observations,
  }: IRequest) {
    const client = await this.clientRepository.getClientById(clientId);

    if (!client) {
      return {
        status: 404,
        errorMessage: 'Cliente não encontrado',
      };
    }

    await this.clientRepository.updateClient(clientId, {
      name,
      email,
      address,
      observations,
    });

    return {
      status: 200,
    };
  }
}
