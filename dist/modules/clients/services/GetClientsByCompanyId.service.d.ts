export default class GetClientsByCompanyIdService {
    private clientRepository;
    private companyRepository;
    constructor();
    execute(companyId: string, skip: number, name?: string): Promise<{
        status: number;
        errorMessage: string;
        clients?: undefined;
        pages?: undefined;
    } | {
        status: number;
        clients: {
            companyId: string;
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            address: string;
            observations: string | null;
        }[];
        pages: number;
        errorMessage?: undefined;
    }>;
}
