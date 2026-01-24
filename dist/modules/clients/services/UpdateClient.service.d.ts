interface IRequest {
    clientId: string;
    name?: string;
    email?: string;
    address?: string;
    observations?: string;
}
export default class UpdateClientService {
    private clientRepository;
    constructor();
    execute({ clientId, name, email, address, observations, }: IRequest): Promise<{
        status: number;
        errorMessage: string;
    } | {
        status: number;
        errorMessage?: undefined;
    }>;
}
export {};
