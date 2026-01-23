import RoleRepository from '../repository/RoleRepository';

export default class DeleteRoleService {
  private roleRepository: RoleRepository;

  constructor() {
    this.roleRepository = new RoleRepository();
  }

  public async execute(roleId: string, companyId: string) {
    const role = await this.roleRepository.getById(roleId);

    if (!role) {
      return {
        status: 404,
        errorMessage: 'Role não encontrada',
      };
    }

    // Não permitir deletar roles globais (Admin)
    if (role.companyId === null) {
      return {
        status: 403,
        errorMessage: 'Não é possível excluir roles globais',
      };
    }

    // Verificar se a role pertence à empresa
    if (role.companyId !== companyId) {
      return {
        status: 403,
        errorMessage: 'Sem permissão para excluir esta role',
      };
    }

    // Verificar se há funcionários usando esta role
    const hasEmployees = await this.roleRepository.hasEmployees(roleId);
    if (hasEmployees) {
      return {
        status: 400,
        errorMessage: 'Não é possível excluir uma role que possui funcionários vinculados',
      };
    }

    await this.roleRepository.delete(roleId);

    return {
      status: 200,
      message: 'Role excluída com sucesso',
    };
  }
}
