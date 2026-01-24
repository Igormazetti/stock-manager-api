import { UpdateEmployeePayload } from '../types';
export default class UpdateEmployeeService {
    private employeeRepository;
    constructor();
    execute(id: string, companyId: string, data: UpdateEmployeePayload): Promise<{
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
