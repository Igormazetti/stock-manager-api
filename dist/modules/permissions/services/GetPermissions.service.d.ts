export default class GetPermissionsService {
    private permissionRepository;
    constructor();
    execute(): Promise<{
        status: number;
        permissions: any;
    }>;
}
