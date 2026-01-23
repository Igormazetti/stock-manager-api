import RoleRepository from '../repository/RoleRepository';
import { CreateRolePayload } from '../types';

export default class CreateRoleService {
  private roleRepository: RoleRepository;

  constructor() {
    this.roleRepository = new RoleRepository();
  }

  public async execute(companyId: string, data: CreateRolePayload) {
    // Verificar se já existe uma role com esse nome para essa empresa
    const existingRole = await this.roleRepository.getByNameAndCompanyId(
      data.name,
      companyId
    );

    if (existingRole) {
      return {
        status: 400,
        errorMessage: 'Já existe uma role com esse nome',
      };
    }

    const role = await this.roleRepository.create(companyId, data);

    return {
      status: 201,
      role: {
        id: role.id,
        name: role.name,
        description: role.description,
        permissions: role.permissions.map((rp) => ({
          id: rp.Permission.id,
          permission: rp.Permission.permission,
          description: rp.Permission.description,
        })),
      },
    };
  }
}
