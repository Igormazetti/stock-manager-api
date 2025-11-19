export interface SalesPayload {
  clientId: string;
  companyId: string;
  discount?: number;
  observation?: string;
  paid: boolean;
  paymentTime?: Date | null;
  products: {
    id: string;
    quantity: number;
  }[];
}
