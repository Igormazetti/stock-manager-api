import { CreateRolePayload } from '../types';
export default class CreateRoleService {
    private roleRepository;
    constructor();
    execute(companyId: string, data: CreateRolePayload): Promise<{
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
