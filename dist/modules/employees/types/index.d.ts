export interface CreateEmployeePayload {
    name: string;
    email: string;
    password: string;
    roleId: string;
    companyId: string;
}
export interface UpdateEmployeePayload {
    name?: string;
    email?: string;
    password?: string;
    roleId?: string;
    active?: boolean;
}
