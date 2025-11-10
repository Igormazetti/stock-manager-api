import ClientRepository from '../repository/ClientRepository';

interface IRequest {
  name: string;
  email?: string;
  address: string;
  observations?: string;
  companyId: string;
}

export default class CreateClientService {
  private clientRepository: ClientRepository;

  constructor() {
    this.clientRepository = new ClientRepository();
  }

  public async execute({
    name,
    email,
    address,
    observations,
    companyId,
  }: IRequest) {
    if (email) {
      const existingClient = await this.clientRepository.getClientByEmail(
        companyId,
        email,
      );

      if (existingClient) {
        return {
          status: 422,
          errorMessage: 'Já existe cliente cadastrado com este email',
        };
      }
    }

    await this.clientRepository.createClient({
      name,
      email,
      address,
      observations,
      companyId,
    });

    return {
      status: 200,
    };
  }
}
