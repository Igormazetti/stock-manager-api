import RoleRepository from '../repository/RoleRepository';
import { UpdateRolePayload } from '../types';

export default class UpdateRoleService {
  private roleRepository: RoleRepository;

  constructor() {
    this.roleRepository = new RoleRepository();
  }

  public async execute(roleId: string, companyId: string, data: UpdateRolePayload) {
    const role = await this.roleRepository.getById(roleId);

    if (!role) {
      return {
        status: 404,
        errorMessage: 'Role não encontrada',
      };
    }

    // Não permitir editar roles globais (Admin)
    if (role.companyId === null) {
      return {
        status: 403,
        errorMessage: 'Não é possível editar roles globais',
      };
    }

    // Verificar se a role pertence à empresa
    if (role.companyId !== companyId) {
      return {
        status: 403,
        errorMessage: 'Sem permissão para editar esta role',
      };
    }

    // Verificar se já existe outra role com o mesmo nome
    if (data.name && data.name !== role.name) {
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
    }

    const updatedRole = await this.roleRepository.update(roleId, data);

    return {
      status: 200,
      role: {
        id: updatedRole.id,
        name: updatedRole.name,
        description: updatedRole.description,
        permissions: updatedRole.permissions.map((rp) => ({
          id: rp.Permission.id,
          permission: rp.Permission.permission,
          description: rp.Permission.description,
        })),
      },
    };
  }
}
