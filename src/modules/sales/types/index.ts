export interface SalesPayload {
  clientId: string;
  companyId: string;
  discount?: number;
  observation?: string;
  products: {
    id: string;
    quantity: number;
  }[];
}
