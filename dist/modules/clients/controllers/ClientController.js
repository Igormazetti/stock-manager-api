"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const yup_1 = require("yup");
const CreateClient_service_1 = __importDefault(require("../services/CreateClient.service"));
const UpdateClient_service_1 = __importDefault(require("../services/UpdateClient.service"));
const DeleteClient_service_1 = __importDefault(require("../services/DeleteClient.service"));
const GetClientsByCompanyId_service_1 = __importDefault(require("../services/GetClientsByCompanyId.service"));
const CreateClientSchema = (0, yup_1.object)({
    name: (0, yup_1.string)().required(),
    email: (0, yup_1.string)().email(),
    address: (0, yup_1.string)().required(),
    observations: (0, yup_1.string)(),
});
const UpdateClientSchema = (0, yup_1.object)({
    name: (0, yup_1.string)(),
    email: (0, yup_1.string)().email(),
    address: (0, yup_1.string)(),
    observations: (0, yup_1.string)(),
});
class ClientController {
    async create(request, response) {
        const { name, email, address, observations } = await CreateClientSchema.validate(request.body);
        const createClientService = tsyringe_1.container.resolve(CreateClient_service_1.default);
        const companyId = request.company.id;
        const client = await createClientService.execute({
            name,
            email,
            address,
            observations,
            companyId,
        });
        return response.status(client.status).json(client);
    }
    async getClientsByCompanyId(request, response) {
        const { skip, name } = request.query;
        const companyId = request.company.id;
        const getClientsByCompanyIdService = tsyringe_1.container.resolve(GetClientsByCompanyId_service_1.default);
        const clients = await getClientsByCompanyIdService.execute(companyId, Number(skip), name || undefined);
        return response.status(clients.status).json(clients);
    }
    async update(request, response) {
        const { id } = request.params;
        const { name, email, address, observations } = await UpdateClientSchema.validate(request.body);
        const updateClientService = tsyringe_1.container.resolve(UpdateClient_service_1.default);
        const update = await updateClientService.execute({
            clientId: id,
            name,
            email,
            address,
            observations,
        });
        return response.status(update.status).json(update);
    }
    async delete(request, response) {
        const { id } = request.params;
        const deleteClientService = tsyringe_1.container.resolve(DeleteClient_service_1.default);
        const result = await deleteClientService.execute({
            clientId: id,
        });
        return response.status(result.status).json(result);
    }
}
exports.default = ClientController;
//# sourceMappingURL=ClientController.js.map