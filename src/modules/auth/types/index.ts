export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  errorMessage?: string;
  token?: string;
  user?: {
    id: string;
    type: 'company' | 'employee';
    name: string;
    email: string;
    companyId: string;
    permissions: string[];
  };
}
