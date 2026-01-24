import { CreateEmployeePayload, UpdateEmployeePayload } from '../types';
export default class EmployeeRepository {
    private db;
    create(data: CreateEmployeePayload): Promise<any>;
    getByCompanyId(companyId: string, active?: boolean): Promise<any>;
    getById(id: string): Promise<any>;
    getByEmail(email: string): Promise<any>;
    update(id: string, data: UpdateEmployeePayload): Promise<any>;
    delete(id: string): Promise<any>;
}
