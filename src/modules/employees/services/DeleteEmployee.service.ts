import EmployeeRepository from '../repository/EmployeeRepository';

export default class DeleteEmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  public async execute(id: string, companyId: string) {
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
        errorMessage: 'Sem permissão para excluir este funcionário',
      };
    }

    await this.employeeRepository.delete(id);

    return {
      status: 200,
      message: 'Funcionário excluído com sucesso',
    };
  }
}
