"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../../../database/prismaClient");
class CompanyRepository {
    db;
    constructor() {
        this.db = prismaClient_1.prisma.company;
    }
    async createCompany({ name, email, password, defaultRoleId, }) {
        const user = await this.db.create({
            data: {
                name,
                email,
                password,
                defaultRoleId,
            },
        });
        return user;
    }
    async getAllCompanies() {
        const company = await this.db.findMany();
        return company;
    }
    async findById(id) {
        const company = await this.db.findUnique({
            where: {
                id,
            },
        });
        return company;
    }
    async findByEmail(email) {
        const company = await this.db.findUnique({
            where: {
                email,
            },
        });
        return company;
    }
    async updateCompany(id, data) {
        const company = await this.db.update({
            where: { id },
            data,
        });
        return company;
    }
}
exports.default = CompanyRepository;
//# sourceMappingURL=CompanyRepository.js.map