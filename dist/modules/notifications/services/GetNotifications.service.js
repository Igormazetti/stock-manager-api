"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotificationsRepository_1 = __importDefault(require("../repository/NotificationsRepository"));
class GetNotificationsService {
    notificationsRepository;
    constructor() {
        this.notificationsRepository = new NotificationsRepository_1.default();
    }
    async execute(companyId, skip = 0, take = 50) {
        try {
            const { notifications, totalCount } = await this.notificationsRepository.getNotificationsByCompany(companyId, skip, take);
            return {
                status: 200,
                data: notifications,
                totalCount,
            };
        }
        catch (err) {
            return {
                status: 400,
                errorMessage: 'Falha ao buscar notificações',
            };
        }
    }
}
exports.default = GetNotificationsService;
//# sourceMappingURL=GetNotifications.service.js.map