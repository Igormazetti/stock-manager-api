declare namespace Express {
  export interface Request {
    company: {
      id: string;
    };
    user: {
      id: string;
      type: 'company' | 'employee';
      companyId: string;
      permissions: string[];
    };
  }
}
