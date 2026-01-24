export default class ResetPasswordService {
    private companyRepository;
    private encrypt;
    constructor();
    execute(companyId: string, oldPassword: string, newPassword: string): Promise<{
        status: number;
        errorMessage: string;
        message?: undefined;
    } | {
        status: number;
        message: string;
        errorMessage?: undefined;
    }>;
}
