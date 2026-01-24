"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotificationsRepository_1 = __importDefault(require("../repository/NotificationsRepository"));
class CreateNotificationService {
    constructor() {
        this.notificationsRepository = new NotificationsRepository_1.default();
    }
    async execute({ companyId, entity, description, productName, }) {
        try {
            await this.notificationsRepository.createNotification({
                companyId,
                entity,
                description,
                productName,
            });
            return {
                status: 201,
            };
        }
        catch (err) {
            return {
                status: 400,
                errorMessage: 'Falha ao criar notificação',
            };
        }
    }
}
exports.default = CreateNotificationService;
//# sourceMappingURL=CreateNotification.service.js.map