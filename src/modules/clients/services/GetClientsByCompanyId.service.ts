import ClientRepository from '../repository/ClientRepository';
import CompanyRepository from '../../companies/repository/CompanyRepository';

export default class GetClientsByCompanyIdService {
  private clientRepository: ClientRepository;
  private companyRepository: CompanyRepository;

  constructor() {
    this.clientRepository = new ClientRepository();
    this.companyRepository = new CompanyRepository();
  }

  public async execute(companyId: string, skip: number, name?: string) {
    const existingCompany = await this.companyRepository.findById(companyId);
    const take = 10;

    if (!existingCompany) {
      return {
        status: 404,
        errorMessage: 'Empresa não encontrada!',
      };
    }

    const clients = await this.clientRepository.getClientsByCompanyId(
      companyId,
      skip,
      take,
      name,
    );

    const pages = Math.ceil(clients.totalCount / take);

    return {
      status: 200,
      clients: clients.clients,
      pages,
    };
  }
}
