import CompanyRepository from '../repository/CompanyRepository';
import Encrypt from '../../../utils/hash';
import Token from '../../../utils/jwt';

export default class LoginService {
  private companyRepository: CompanyRepository;

  private encrypt: Encrypt;

  constructor() {
    this.companyRepository = new CompanyRepository();
    this.encrypt = new Encrypt();
  }

  public async execute(email: string, password: string) {
    const company = await this.companyRepository.findByEmail(email);

    if (!company) {
      return {
        status: 404,
        errorMessage: 'Usuário não encontrado!',
      };
    }

    const checkHash = this.encrypt.checkPassword(password, company.password);

    if (!checkHash) {
      return {
        status: 401,
        errorMessage: 'Senha inválida!',
      };
    }

    const tokenInstance = new Token();

    const token = tokenInstance.createToken(String(company.id));

    return {
      status: 200,
      company: {
        id: company.id,
        name: company.name,
        email: company.email,
        valid: company.valid,
      },
      token,
    };
  }
}
