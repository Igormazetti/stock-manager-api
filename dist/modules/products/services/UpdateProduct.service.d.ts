interface IRequest {
    productId: string;
    title?: string;
    code?: string;
    value?: number;
    originalValue?: number;
    description?: string;
    imgUrl?: string;
    quantity?: number;
}
export default class UpdateProductsService {
    private productRepository;
    constructor();
    execute({ productId, title, code, value, originalValue, description, imgUrl, quantity, }: IRequest): Promise<{
        status: number;
        errorMessage: string;
    } | {
        status: number;
        errorMessage?: undefined;
    }>;
}
export {};
