type RequestProps = {
    companyId: string;
    active?: boolean;
};
export default class GetEmployeeService {
    private employeeRepository;
    constructor();
    execute({ companyId, active }: RequestProps): Promise<{
        status: number;
        employees: any;
    }>;
}
export {};
