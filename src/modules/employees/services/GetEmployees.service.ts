import EmployeeRepository from '../repository/EmployeeRepository';

type RequestProps = {
  active?: boolean;
};

export default class GetEmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  public async execute({ active }: RequestProps) {
    const employees = await this.employeeRepository.getEmployees({ active });

    return {
      status: 200,
      employees,
    };
  }
}
