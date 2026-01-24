"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../../../database/prismaClient");
class NotificationsRepository {
    constructor() {
        this.db = prismaClient_1.prisma.notification;
    }
    async createNotification({ companyId, entity, description, productName, }) {
        await this.db.create({
            data: {
                companyId,
                entity,
                description,
                productName,
            },
        });
    }
    async getNotificationsByCompany(companyId, skip = 0, take = 50) {
        const notifications = await this.db.findMany({
            where: {
                companyId,
            },
            skip,
            take,
            orderBy: {
                createdAt: 'desc',
            },
        });
        const totalCount = await this.db.count({
            where: {
                companyId,
            },
        });
        return { notifications, totalCount };
    }
    async updateNotificationRead(notificationId, readed) {
        await this.db.update({
            where: {
                id: notificationId,
            },
            data: {
                readed,
            },
        });
    }
    async getNotificationById(notificationId) {
        return this.db.findUnique({
            where: {
                id: notificationId,
            },
        });
    }
}
exports.default = NotificationsRepository;
//# sourceMappingURL=NotificationsRepository.js.map