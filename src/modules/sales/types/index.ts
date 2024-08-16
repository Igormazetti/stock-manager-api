export interface SalesPayload {
  client: string;
  companyId: string;
  employeeId: string;
  products: {
    id: string;
    quantity: number;
  }[];
}
