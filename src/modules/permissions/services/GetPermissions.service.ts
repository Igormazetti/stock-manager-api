import PermissionRepository from '../repository/PermissionRepository';

export default class GetPermissionsService {
  private permissionRepository: PermissionRepository;

  constructor() {
    this.permissionRepository = new PermissionRepository();
  }

  public async execute() {
    const permissions = await this.permissionRepository.getAll();

    return {
      status: 200,
      permissions,
    };
  }
}
