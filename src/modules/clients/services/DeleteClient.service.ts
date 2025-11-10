import ClientRepository from '../repository/ClientRepository';

interface IRequest {
  clientId: string;
}

export default class DeleteClientService {
  private clientRepository: ClientRepository;

  constructor() {
    this.clientRepository = new ClientRepository();
  }

  public async execute({ clientId }: IRequest) {
    const client = await this.clientRepository.getClientById(clientId);

    if (!client) {
      return {
        status: 404,
        errorMessage: 'Cliente não encontrado',
      };
    }

    await this.clientRepository.deleteClient(clientId);

    return {
      status: 200,
    };
  }
}
