export default class GetProductsByCompanyIdService {
    private productRepository;
    private companyRepository;
    constructor();
    execute(companyId: string, skip: number, name?: string, order?: string): Promise<{
        status: number;
        errorMessage: string;
        products?: undefined;
        pages?: undefined;
    } | {
        status: number;
        products: {
            title: string;
            code: string | null;
            value: number;
            originalValue: number;
            description: string;
            imgUrl: string | null;
            companyId: string;
            quantity: number;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        pages: number;
        errorMessage?: undefined;
    }>;
}
