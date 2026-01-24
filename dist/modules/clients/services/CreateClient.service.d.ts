interface IRequest {
    name: string;
    email?: string;
    address: string;
    observations?: string;
    companyId: string;
}
export default class CreateClientService {
    private clientRepository;
    constructor();
    execute({ name, email, address, observations, companyId, }: IRequest): Promise<{
        status: number;
        errorMessage: string;
    } | {
        status: number;
        errorMessage?: undefined;
    }>;
}
export {};
