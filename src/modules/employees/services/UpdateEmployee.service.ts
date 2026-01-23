import Encrypt from '../../../utils/hash';
import EmployeeRepository from '../repository/EmployeeRepository';
import { UpdateEmployeePayload } from '../types';

export default class UpdateEmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  public async execute(id: string, companyId: string, data: UpdateEmployeePayload) {
    const existingEmployee = await this.employeeRepository.getById(id);

    if (!existingEmployee) {
      return {
        status: 404,
        errorMessage: 'Funcionário não encontrado',
      };
    }

    // Verificar se o funcionário pertence à empresa
    if (existingEmployee.companyId !== companyId) {
      return {
        status: 403,
        errorMessage: 'Sem permissão para editar este funcionário',
      };
    }

    // Verificar se o email já está em uso
    if (data.email && data.email !== existingEmployee.email) {
      const existingEmail = await this.employeeRepository.getByEmail(data.email);
      if (existingEmail) {
        return {
          status: 400,
          errorMessage: 'Email já cadastrado',
        };
      }
    }

    // Hash da senha se foi fornecida
    let updateData = { ...data };
    if (data.password) {
      const encrypt = new Encrypt();
      updateData.password = encrypt.encryptPassword(data.password);
    }

    const employee = await this.employeeRepository.update(id, updateData);

    return {
      status: 200,
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
