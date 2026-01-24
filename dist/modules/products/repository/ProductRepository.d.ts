import { Product } from '@prisma/client';
interface ProductPayload {
    title: string;
    code?: string;
    value: number;
    originalValue: number;
    description: string;
    imgUrl?: string;
    companyId: string;
    quantity: number;
}
interface UpdateProductPayload {
    title?: string;
    code?: string;
    value?: number;
    originalValue?: number;
    description?: string;
    imgUrl?: string;
    quantity?: number;
}
export default class ProductRepository {
    private db;
    constructor();
    createProduct({ title, code, value, originalValue, description, imgUrl, companyId, quantity, }: ProductPayload): Promise<void>;
    getProductsByCompanyId(companyId: string, skip: number, take: number, name?: string, order?: string, outOfStock?: boolean): Promise<{
        products: Product[];
        totalCount: number;
    }>;
    getProductById(id: string): Promise<any>;
    getProductByName(companyId: string, title: string): Promise<any>;
    updateProduct(id: string, data: UpdateProductPayload): Promise<void>;
}
export {};
