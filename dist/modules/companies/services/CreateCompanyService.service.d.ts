export default class CreateCompanyService {
    private companyRepository;
    private encrypt;
    constructor();
    execute(name: string, email: string, password: string): Promise<{
        status: number;
        errorMessage: string;
        id?: undefined;
        name?: undefined;
        email?: undefined;
    } | {
        id: string;
        status: number;
        name: string;
        email: string;
        errorMessage?: undefined;
    }>;
}
