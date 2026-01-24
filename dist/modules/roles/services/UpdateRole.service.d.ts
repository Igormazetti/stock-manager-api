import { UpdateRolePayload } from '../types';
export default class UpdateRoleService {
    private roleRepository;
    constructor();
    execute(roleId: string, companyId: string, data: UpdateRolePayload): Promise<{
        status: number;
        errorMessage: string;
        role?: undefined;
    } | {
        status: number;
        role: {
            id: any;
            name: any;
            description: any;
            permissions: any;
        };
        errorMessage?: undefined;
    }>;
}
