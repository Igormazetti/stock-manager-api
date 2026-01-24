export default class LoginService {
    private companyRepository;
    private encrypt;
    constructor();
    execute(email: string, password: string): Promise<{
        status: number;
        errorMessage: string;
        company?: undefined;
        token?: undefined;
    } | {
        status: number;
        company: {
            id: string;
            name: string;
            email: string;
            valid: boolean;
        };
        token: string;
        errorMessage?: undefined;
    }>;
}
