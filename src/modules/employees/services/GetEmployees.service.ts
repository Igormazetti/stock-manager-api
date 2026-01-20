import EmployeeRepository from '../repository/EmployeeRepository';

type RequestProps = {
  companyId: string;
  active?: boolean;
};

export default class GetEmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor() {
    this.employeeRepository = new EmployeeRepository();
  }

  public async execute({ companyId, active }: RequestProps) {
    const employees = await this.employeeRepository.getByCompanyId(companyId, active);

    return {
      status: 200,
      employees: employees.map((emp) => ({
        id: emp.id,
        name: emp.name,
        email: emp.email,
        active: emp.active,
        createdAt: emp.createdAt,
        role: {
          id: emp.Role.id,
          name: emp.Role.name,
        },
      })),
    };
  }
}
