"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const yup_1 = require("yup");
const GetNotifications_service_1 = __importDefault(require("../services/GetNotifications.service"));
const MarkNotificationAsRead_service_1 = __importDefault(require("../services/MarkNotificationAsRead.service"));
const GetNotificationsSchema = (0, yup_1.object)({
    skip: (0, yup_1.number)().optional().default(0),
    take: (0, yup_1.number)().optional().default(50),
});
class NotificationsController {
    async getAll(request, response) {
        const { skip, take } = await GetNotificationsSchema.validate(request.query);
        const companyId = request.company.id;
        const getNotificationsService = tsyringe_1.container.resolve(GetNotifications_service_1.default);
        const result = await getNotificationsService.execute(companyId, Number(skip), Number(take));
        return response.status(result.status).json(result);
    }
    async markAsRead(request, response) {
        const { id } = request.params;
        const markNotificationAsReadService = tsyringe_1.container.resolve(MarkNotificationAsRead_service_1.default);
        const result = await markNotificationAsReadService.execute(id);
        return response.status(result.status).json(result);
    }
}
exports.default = NotificationsController;
//# sourceMappingURL=NotificationsController.js.map