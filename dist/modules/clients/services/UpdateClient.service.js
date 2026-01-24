"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientRepository_1 = __importDefault(require("../repository/ClientRepository"));
class UpdateClientService {
    clientRepository;
    constructor() {
        this.clientRepository = new ClientRepository_1.default();
    }
    async execute({ clientId, name, email, address, observations, }) {
        const client = await this.clientRepository.getClientById(clientId);
        if (!client) {
            return {
                status: 404,
                errorMessage: 'Cliente não encontrado',
            };
        }
        await this.clientRepository.updateClient(clientId, {
            name,
            email,
            address,
            observations,
        });
        return {
            status: 200,
        };
    }
}
exports.default = UpdateClientService;
//# sourceMappingURL=UpdateClient.service.js.map