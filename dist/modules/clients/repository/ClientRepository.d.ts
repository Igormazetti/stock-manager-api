import { Client } from '@prisma/client';
interface ClientPayload {
    name: string;
    email?: string;
    address: string;
    observations?: string;
    companyId: string;
}
interface UpdateClientPayload {
    name?: string;
    email?: string;
    address?: string;
    observations?: string;
}
export default class ClientRepository {
    private db;
    constructor();
    createClient({ name, email, address, observations, companyId, }: ClientPayload): Promise<void>;
    getClientsByCompanyId(companyId: string, skip: number, take: number, name?: string): Promise<{
        clients: Client[];
        totalCount: number;
    }>;
    getClientById(id: string): Promise<any>;
    getClientByEmail(companyId: string, email: string): Promise<any>;
    updateClient(id: string, data: UpdateClientPayload): Promise<void>;
    deleteClient(id: string): Promise<void>;
}
export {};
