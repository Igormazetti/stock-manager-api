export interface CreateRolePayload {
  name: string;
  description?: string;
  permissionIds: number[];
}

export interface UpdateRolePayload {
  name?: string;
  description?: string;
  permissionIds?: number[];
}
