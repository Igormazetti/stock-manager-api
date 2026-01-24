import { LoginPayload, LoginResponse } from '../types';
export default class LoginEmployeeService {
    execute({ email, password }: LoginPayload): Promise<LoginResponse>;
}
