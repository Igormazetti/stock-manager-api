import { CreateEmployeePayload } from '../types';
export default class CreateEmployeeService {
    private employeeRepository;
    constructor();
    execute(data: Omit<CreateEmployeePayload, 'companyId'>, companyId: string): Promise<{
        status: number;
        errorMessage: string;
        employee?: undefined;
    } | {
        status: number;
        employee: {
            id: any;
            name: any;
            email: any;
            active: any;
            role: {
                id: any;
                name: any;
            };
        };
        errorMessage?: undefined;
    }>;
}
