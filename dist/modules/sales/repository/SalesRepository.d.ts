import { SalesPayload } from '../types';
export default class SalesRepository {
    private db;
    constructor();
    getSales(companyId: string, skip: number, take: number, createdAt?: string, clientName?: string, product?: string, paid?: boolean, paymentTimeStart?: string, paymentTimeEnd?: string): Promise<{
        sales: any;
        totalCount: any;
    }>;
    createSale({ clientId, companyId, products, observation, paid, paymentTime, }: SalesPayload): Promise<void>;
    getSaleById(saleId: string, companyId: string): Promise<any>;
    updateSale(saleId: string, data: {
        paid?: boolean;
        paymentTime?: Date | null;
    }): Promise<void>;
}
