export default class PermissionRepository {
    private db;
    getAll(): Promise<any>;
    getById(id: number): Promise<any>;
    getByPermission(permission: string): Promise<any>;
}
