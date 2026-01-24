interface IRequest {
    clientId: string;
}
export default class DeleteClientService {
    private clientRepository;
    constructor();
    execute({ clientId }: IRequest): Promise<{
        status: number;
        errorMessage: string;
    } | {
        status: number;
        errorMessage?: undefined;
    }>;
}
export {};
