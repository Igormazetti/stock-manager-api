import { CreateRolePayload, UpdateRolePayload } from '../types';
export default class RoleRepository {
    private db;
    create(companyId: string, data: CreateRolePayload): Promise<any>;
    getByCompanyId(companyId: string): Promise<any>;
    getById(id: string): Promise<any>;
    getByNameAndCompanyId(name: string, companyId: string | null): Promise<any>;
    update(id: string, data: UpdateRolePayload): Promise<any>;
    delete(id: string): Promise<any>;
    hasEmployees(roleId: string): Promise<boolean>;
}
