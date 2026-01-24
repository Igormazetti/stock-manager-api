export default class DeleteRoleService {
    private roleRepository;
    constructor();
    execute(roleId: string, companyId: string): Promise<{
        status: number;
        errorMessage: string;
        message?: undefined;
    } | {
        status: number;
        message: string;
        errorMessage?: undefined;
    }>;
}
