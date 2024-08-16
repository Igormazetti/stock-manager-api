export interface EmployeePayload {
  name: string;
}

export interface UpdateEmployeePayload {
  name?: string;
  active?: boolean;
}
