"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../../../database/prismaClient");
class ClientRepository {
    db;
    constructor() {
        this.db = prismaClient_1.prisma.client;
    }
    async createClient({ name, email, address, observations, companyId, }) {
        await this.db.create({
            data: { name, email, address, observations, companyId },
        });
    }
    async getClientsByCompanyId(companyId, skip, take, name) {
        const clients = await this.db.findMany({
            skip,
            take,
            where: {
                companyId,
                ...(name
                    ? {
                        name: {
                            contains: name,
                            mode: 'insensitive',
                        },
                    }
                    : {}),
            },
            orderBy: { createdAt: 'desc' },
        });
        const totalCount = await this.db.count({
            where: { companyId },
        });
        return { clients, totalCount };
    }
    async getClientById(id) {
        const client = await this.db.findUnique({
            where: { id },
        });
        return client;
    }
    async getClientByEmail(companyId, email) {
        const client = await this.db.findFirst({
            where: {
                email,
                companyId,
            },
        });
        return client;
    }
    async updateClient(id, data) {
        await this.db.update({
            where: { id },
            data,
        });
    }
    async deleteClient(id) {
        await this.db.delete({
            where: { id },
        });
    }
}
exports.default = ClientRepository;
//# sourceMappingURL=ClientRepository.js.map