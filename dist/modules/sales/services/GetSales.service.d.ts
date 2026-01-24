export default class GetSaleService {
    private companyRepository;
    private salesRepository;
    constructor();
    execute(companyId: string, skip: number, createdAt?: string, clientName?: string, product?: string, paid?: boolean, paymentTimeStart?: string, paymentTimeEnd?: string): Promise<{
        status: number;
        errorMessage: string;
        sales?: undefined;
        pages?: undefined;
    } | {
        status: number;
        sales: any;
        pages: number;
        errorMessage?: undefined;
    }>;
}
