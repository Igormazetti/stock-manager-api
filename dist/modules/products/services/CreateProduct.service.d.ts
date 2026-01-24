interface IRequest {
    title: string;
    code?: string;
    value: number;
    originalValue: number;
    description: string;
    companyId: string;
    imgUrl?: string;
    quantity: number;
}
export default class CreateProductsService {
    private productRepository;
    constructor();
    execute({ title, code, value, originalValue, description, imgUrl, companyId, quantity, }: IRequest): Promise<{
        status: number;
        errorMessage: string;
    } | {
        status: number;
        errorMessage?: undefined;
    }>;
}
export {};
