export default class GetRolesService {
    private roleRepository;
    constructor();
    execute(companyId: string): Promise<{
        status: number;
        roles: any;
    }>;
}
