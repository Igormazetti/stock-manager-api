interface IUpdateCompanyData {
    name?: string;
    email?: string;
    logoUrl?: string;
    cnpj?: string;
    address?: string;
    phone?: string;
    cep?: string;
    city?: string;
    state?: string;
}
export default class UpdateCompanyService {
    private companyRepository;
    constructor();
    execute(companyId: string, data: IUpdateCompanyData): Promise<{
        status: number;
        errorMessage: string;
        company?: undefined;
    } | {
        status: number;
        company: {
            id: string;
            name: string;
            email: string;
            logoUrl: string | null;
            valid: boolean;
            cnpj: string | null;
            address: string | null;
            phone: string | null;
            cep: string | null;
            city: string | null;
            state: string | null;
        };
        errorMessage?: undefined;
    }>;
}
export {};
