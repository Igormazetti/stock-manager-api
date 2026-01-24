export default class DeleteEmployeeService {
    private employeeRepository;
    constructor();
    execute(id: string, companyId: string): Promise<{
        status: number;
        errorMessage: string;
        message?: undefined;
    } | {
        status: number;
        message: string;
        errorMessage?: undefined;
    }>;
}
