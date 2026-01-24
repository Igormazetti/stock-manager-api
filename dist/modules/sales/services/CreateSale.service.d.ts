import { SalesPayload } from '../types';
export default class CreateSaleService {
    private salesRepository;
    private productsRepository;
    private createNotificationService;
    constructor();
    execute({ clientId, companyId, products, observation, paid, paymentTime }: SalesPayload): Promise<{
        status: number;
        errorMessage?: undefined;
    } | {
        status: number;
        errorMessage: string;
    }>;
}
