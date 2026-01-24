export interface SalesPayload {
    clientId: string;
    companyId: string;
    observation?: string;
    paid: boolean;
    paymentTime?: Date | null;
    products: {
        id: string;
        quantity: number;
        productSaleValue: number;
    }[];
}
