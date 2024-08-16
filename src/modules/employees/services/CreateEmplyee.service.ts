import EmployeeRepository from '../repository/EmployeeRepository';

export default class CreateEmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  public async execute(name: string) {
    try {
      const existingEmployee = await this.employeeRepository.getByName(name);

      if (existingEmployee) {
        return {
          status: 400,
          errorMessage: 'Funcionário já cadastrado',
        };
      }

      await this.employeeRepository.createEmployee({ name });

      return {
        status: 200,
      };
    } catch (error) {
      return {
        status: 400,
        errorMessage: 'Erro ao tentar criar funcionário',
      };
    }
  }
}
