export default class GetCompanyService {
    private companyRepository;
    constructor();
    execute(companyId: string): Promise<{
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
