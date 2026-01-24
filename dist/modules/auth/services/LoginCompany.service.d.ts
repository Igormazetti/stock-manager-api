import { LoginPayload, LoginResponse } from '../types';
export default class LoginCompanyService {
    execute({ email, password }: LoginPayload): Promise<LoginResponse>;
}
