"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../../../database/prismaClient");
class ProductRepository {
    constructor() {
        this.db = prismaClient_1.prisma.product;
    }
    async createProduct({ title, code, value, originalValue, description, imgUrl, companyId, quantity, }) {
        await this.db.create({
            data: { title, code, value, originalValue, description, imgUrl, companyId, quantity },
        });
    }
    async getProductsByCompanyId(companyId, skip, take, name, order, outOfStock) {
        const products = await this.db.findMany({
            skip,
            take,
            where: {
                companyId,
                ...(name
                    ? {
                        OR: [
                            {
                                title: {
                                    contains: name,
                                    mode: 'insensitive',
                                },
                            },
                            {
                                code: {
                                    contains: name,
                                    mode: 'insensitive',
                                },
                            },
                        ],
                    }
                    : {}),
                ...(outOfStock ? { quantity: 0 } : {}),
            },
            orderBy: order === 'menor'
                ? { quantity: 'asc' }
                : { quantity: 'desc' }
        });
        const totalCount = await this.db.count({
            where: { companyId },
        });
        return { products, totalCount };
    }
    async getProductById(id) {
        const product = await this.db.findUnique({
            where: { id },
        });
        return product;
    }
    async getProductByName(companyId, title) {
        const product = await this.db.findFirst({
            where: {
                title,
                companyId,
            },
        });
        return product;
    }
    async updateProduct(id, data) {
        console.log(id);
        await this.db.update({
            where: { id },
            data,
        });
    }
}
exports.default = ProductRepository;
//# sourceMappingURL=ProductRepository.js.map