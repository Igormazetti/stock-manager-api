import Encrypt from '../../../utils/hash';
import EmployeeRepository from '../repository/EmployeeRepository';
import { CreateEmployeePayload } from '../types';

export default class CreateEmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  public async execute(data: Omit<CreateEmployeePayload, 'companyId'>, companyId: string) {
    const existingEmployee = await this.employeeRepository.getByEmail(data.email);

    if (existingEmployee) {
      return {
        status: 400,
        errorMessage: 'Email já cadastrado',
      };
    }

    const encrypt = new Encrypt();
    const hashedPassword = encrypt.encryptPassword(data.password);

    const employee = await this.employeeRepository.create({
      ...data,
      password: hashedPassword,
      companyId,
    });

    return {
      status: 201,
      employee: {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        active: employee.active,
        role: {
          id: employee.Role.id,
          name: employee.Role.name,
        },
      },
    };
  }
}
