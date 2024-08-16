export interface SalesPayload {
  client: string;
  companyId: string;
  products: {
    id: string;
    quantity: number;
  }[];
}
