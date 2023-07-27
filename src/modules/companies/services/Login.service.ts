import { CustomError } from '../../../common/error/CustomError';
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
      throw new CustomError('Usuário não encontrado!', 404);
    }

    const checkHash = this.encrypt.checkPassword(password, company.password);

    if (!checkHash) {
      throw new CustomError('Senha inválida!', 401);
    }

    const tokenInstance = new Token();

    const token = tokenInstance.createToken(String(company.id));

    return {
      company,
      token,
    };
  }
}
