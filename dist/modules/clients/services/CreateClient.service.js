"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientRepository_1 = __importDefault(require("../repository/ClientRepository"));
class CreateClientService {
    clientRepository;
    constructor() {
        this.clientRepository = new ClientRepository_1.default();
    }
    async execute({ name, email, address, observations, companyId, }) {
        if (email) {
            const existingClient = await this.clientRepository.getClientByEmail(companyId, email);
            if (existingClient) {
                return {
                    status: 422,
                    errorMessage: 'Já existe cliente cadastrado com este email',
                };
            }
        }
        await this.clientRepository.createClient({
            name,
            email,
            address,
            observations,
            companyId,
        });
        return {
            status: 200,
        };
    }
}
exports.default = CreateClientService;
//# sourceMappingURL=CreateClient.service.js.map