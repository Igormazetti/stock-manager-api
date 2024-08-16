import EmployeeRepository from '../repository/EmployeeRepository';
import { UpdateEmployeePayload } from '../types';

export default class UpdateEmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  public async execute(id: string, { name, active }: UpdateEmployeePayload) {
    try {
      const existingEmployee = await this.employeeRepository.getById(id);

      if (!existingEmployee) {
        return {
          status: 404,
          errorMessage: 'Funcionário não encontrado',
        };
      }

      if (name) {
        const existingName = await this.employeeRepository.getByName(name);

        if (existingName) {
          return {
            status: 400,
            errorMessage: 'Funcionário já cadastrado com este nome',
          };
        }
      }

      await this.employeeRepository.updateEmployee(id, { name, active });

      return {
        status: 200,
      };
    } catch (error) {
      return {
        status: 400,
        errorMessage: 'Erro ao tentar editar funcionário',
      };
    }
  }
}
