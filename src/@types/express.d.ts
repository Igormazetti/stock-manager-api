declare namespace Express {
  export interface Request {
    company: {
      id: string;
      name?: string;
    };
  }
}
