"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotificationsRepository_1 = __importDefault(require("../repository/NotificationsRepository"));
class MarkNotificationAsReadService {
    notificationsRepository;
    constructor() {
        this.notificationsRepository = new NotificationsRepository_1.default();
    }
    async execute(notificationId) {
        try {
            const notification = await this.notificationsRepository.getNotificationById(notificationId);
            if (!notification) {
                return {
                    status: 404,
                    errorMessage: 'Notificação não encontrada',
                };
            }
            await this.notificationsRepository.updateNotificationRead(notificationId, true);
            return {
                status: 200,
            };
        }
        catch (err) {
            return {
                status: 400,
                errorMessage: 'Falha ao atualizar notificação',
            };
        }
    }
}
exports.default = MarkNotificationAsReadService;
//# sourceMappingURL=MarkNotificationAsRead.service.js.map