"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../../../database/prismaClient");
class SalesRepository {
    db;
    constructor() {
        this.db = prismaClient_1.prisma.sale;
    }
    async getSales(companyId, skip, take, createdAt, clientName, product, paid, paymentTimeStart, paymentTimeEnd) {
        const whereConditions = {
            company_id: companyId,
        };
        // Filter by date (accepts date string like 2025-11-18 and searches for that day)
        if (createdAt) {
            const startOfDay = new Date(createdAt);
            const endOfDay = new Date(createdAt);
            endOfDay.setDate(endOfDay.getDate() + 1);
            whereConditions.createdAt = {
                gte: startOfDay,
                lt: endOfDay,
            };
        }
        // Filter by client name (case-insensitive)
        if (clientName) {
            whereConditions.Client = {
                name: {
                    contains: clientName,
                    mode: 'insensitive',
                },
            };
        }
        // Filter by paid status
        if (paid !== undefined) {
            whereConditions.paid = paid;
        }
        // Filter by payment time range
        if (paymentTimeStart || paymentTimeEnd) {
            whereConditions.paymentTime = {};
            if (paymentTimeStart) {
                whereConditions.paymentTime.gte = new Date(paymentTimeStart);
            }
            if (paymentTimeEnd) {
                whereConditions.paymentTime.lte = new Date(paymentTimeEnd);
            }
        }
        const sales = await this.db.findMany({
            skip,
            take,
            where: whereConditions,
            include: {
                Products: {
                    include: {
                        Product: true,
                    },
                },
                Client: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        // Filter by product name or code (in-memory filtering after database query)
        let filteredSales = sales;
        if (product) {
            const productLower = product.toLowerCase();
            filteredSales = sales.filter((sale) => sale.Products.some((productOnSale) => productOnSale.Product.title.toLowerCase().includes(productLower) ||
                (productOnSale.Product.code && productOnSale.Product.code.toLowerCase().includes(productLower))));
        }
        const totalCount = await this.db.count({
            where: whereConditions,
        });
        return { sales: filteredSales, totalCount };
    }
    async createSale({ clientId, companyId, products, observation, paid, paymentTime, }) {
        await this.db.create({
            data: {
                clientId,
                company_id: companyId,
                observation,
                paid,
                paymentTime,
                Products: {
                    createMany: {
                        data: products.map((product) => ({
                            product_id: product.id,
                            quantity_sold: product.quantity,
                            productSaleValue: product.productSaleValue,
                        })),
                    },
                },
            },
        });
    }
    async getSaleById(saleId, companyId) {
        return this.db.findFirst({
            where: {
                id: saleId,
                company_id: companyId,
            },
        });
    }
    async updateSale(saleId, data) {
        await this.db.update({
            where: {
                id: saleId,
            },
            data,
        });
    }
}
exports.default = SalesRepository;
//# sourceMappingURL=SalesRepository.js.map