export default class GetProductsByIdService {
    private productRepository;
    constructor();
    execute(productId: string): Promise<{
        status: number;
        errorMessage: string;
        product?: undefined;
    } | {
        status: number;
        product: any;
        errorMessage?: undefined;
    }>;
}
