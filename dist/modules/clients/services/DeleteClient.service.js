"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientRepository_1 = __importDefault(require("../repository/ClientRepository"));
class DeleteClientService {
    clientRepository;
    constructor() {
        this.clientRepository = new ClientRepository_1.default();
    }
    async execute({ clientId }) {
        const client = await this.clientRepository.getClientById(clientId);
        if (!client) {
            return {
                status: 404,
                errorMessage: 'Cliente não encontrado',
            };
        }
        await this.clientRepository.deleteClient(clientId);
        return {
            status: 200,
        };
    }
}
exports.default = DeleteClientService;
//# sourceMappingURL=DeleteClient.service.js.map