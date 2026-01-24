export interface UpdateSalePayload {
    paid?: boolean;
    paymentTime?: Date | null;
}
export default class UpdateSaleService {
    private salesRepository;
    constructor();
    execute(saleId: string, companyId: string, { paid, paymentTime }: UpdateSalePayload): Promise<{
        status: number;
        errorMessage: string;
    } | {
        status: number;
        errorMessage?: undefined;
    }>;
}
