import { Company } from '@prisma/client';
interface ICompany {
    id?: number;
    name: string;
    email: string;
    password: string;
    defaultRoleId?: string;
}
export default class CompanyRepository {
    private db;
    constructor();
    createCompany({ name, email, password, defaultRoleId, }: ICompany): Promise<Company>;
    getAllCompanies(): Promise<Company[]>;
    findById(id: string): Promise<Company | null>;
    findByEmail(email: string): Promise<Company | null>;
    updateCompany(id: string, data: {
        name?: string;
        email?: string;
        password?: string;
        logoUrl?: string;
        cnpj?: string;
        address?: string;
        phone?: string;
        cep?: string;
        city?: string;
        state?: string;
    }): Promise<Company>;
}
export {};
