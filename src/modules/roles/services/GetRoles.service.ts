import RoleRepository from '../repository/RoleRepository';

export default class GetRolesService {
  private roleRepository: RoleRepository;

  constructor() {
    this.roleRepository = new RoleRepository();
  }

  public async execute(companyId: string) {
    const roles = await this.roleRepository.getByCompanyId(companyId);

    return {
      status: 200,
      roles: roles.map((role) => ({
        id: role.id,
        name: role.name,
        description: role.description,
        isGlobal: role.companyId === null,
        permissions: role.permissions.map((rp) => ({
          id: rp.Permission.id,
          permission: rp.Permission.permission,
          description: rp.Permission.description,
        })),
      })),
    };
  }
}
