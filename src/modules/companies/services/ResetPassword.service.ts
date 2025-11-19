import CompanyRepository from '../repository/CompanyRepository';
import Encrypt from '../../../utils/hash';

export default class ResetPasswordService {
  private companyRepository: CompanyRepository;

  private encrypt: Encrypt;

  constructor() {
    this.companyRepository = new CompanyRepository();
    this.encrypt = new Encrypt();
  }

  public async execute(companyId: string, oldPassword: string, newPassword: string) {
    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      return {
        status: 404,
        errorMessage: 'Empresa não encontrada!',
      };
    }

    const checkHash = this.encrypt.checkPassword(oldPassword, company.password);

    if (!checkHash) {
      return {
        status: 401,
        errorMessage: 'Senha atual inválida!',
      };
    }

    const encryptedPassword = this.encrypt.encryptPassword(newPassword);

    await this.companyRepository.updateCompany(companyId, {
      password: encryptedPassword,
    });

    return {
      status: 200,
      message: 'Senha atualizada com sucesso!',
    };
  }
}
