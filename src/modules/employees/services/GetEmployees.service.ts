import EmployeeRepository from '../repository/EmployeeRepository';

export default class GetEmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  public async execute() {
    const employees = await this.employeeRepository.getEmployees();

    return {
      status: 200,
      employees,
    };
  }
}
