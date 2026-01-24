"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const permissions = [
    // Produtos
    { permission: 'products.view', description: 'Visualizar produtos' },
    { permission: 'products.create', description: 'Criar produtos' },
    { permission: 'products.edit', description: 'Editar produtos' },
    { permission: 'products.delete', description: 'Excluir produtos' },
    // Vendas
    { permission: 'sales.view', description: 'Visualizar vendas' },
    { permission: 'sales.create', description: 'Criar vendas' },
    { permission: 'sales.edit', description: 'Editar vendas' },
    { permission: 'sales.delete', description: 'Excluir vendas' },
    // Clientes
    { permission: 'clients.view', description: 'Visualizar clientes' },
    { permission: 'clients.create', description: 'Criar clientes' },
    { permission: 'clients.edit', description: 'Editar clientes' },
    { permission: 'clients.delete', description: 'Excluir clientes' },
    // Funcionários
    { permission: 'employees.view', description: 'Visualizar funcionários' },
    { permission: 'employees.create', description: 'Criar funcionários' },
    { permission: 'employees.edit', description: 'Editar funcionários' },
    { permission: 'employees.delete', description: 'Excluir funcionários' },
    // Notificações
    { permission: 'notifications.view', description: 'Visualizar notificações' },
    { permission: 'notifications.manage', description: 'Gerenciar notificações' },
    // Empresa
    { permission: 'company.edit', description: 'Editar dados da empresa' },
    { permission: 'roles.manage', description: 'Gerenciar roles e permissões' },
    // Especiais
    { permission: 'values.original', description: 'Visualizar valores originais e margens de lucro' },
    { permission: 'subscription.active', description: 'Assinatura ativa' },
];
async function main() {
    console.log('Seeding permissions...');
    // Criar todas as permissions
    for (const perm of permissions) {
        await prisma.permission.upsert({
            where: { permission: perm.permission },
            update: { description: perm.description },
            create: perm,
        });
    }
    console.log(`Created ${permissions.length} permissions`);
    // Buscar todas as permissions criadas
    const allPermissions = await prisma.permission.findMany();
    // Criar role Admin global (companyId = null)
    let adminRole = await prisma.role.findFirst({
        where: { name: 'Admin', companyId: null },
    });
    if (!adminRole) {
        adminRole = await prisma.role.create({
            data: {
                name: 'Admin',
                description: 'Acesso total ao sistema',
                companyId: null,
            },
        });
    }
    else {
        adminRole = await prisma.role.update({
            where: { id: adminRole.id },
            data: { description: 'Acesso total ao sistema' },
        });
    }
    console.log(`Created Admin role: ${adminRole.id}`);
    // Vincular todas as permissions à role Admin
    for (const perm of allPermissions) {
        await prisma.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId: adminRole.id,
                    permissionId: perm.id,
                },
            },
            update: {},
            create: {
                roleId: adminRole.id,
                permissionId: perm.id,
            },
        });
    }
    console.log(`Linked ${allPermissions.length} permissions to Admin role`);
    console.log('Seed completed!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map