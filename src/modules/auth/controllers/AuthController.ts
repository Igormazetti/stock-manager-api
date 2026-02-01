import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { object, string } from 'yup';
import LoginService from '../services/Login.service';

const LoginSchema = object({
  email: string().email().required(),
  password: string().required(),
});

export default class AuthController {
  public async login(request: Request, response: Response) {
    const { email, password } = await LoginSchema.validate(request.body);

    const loginService = container.resolve(LoginService);
    const result = await loginService.execute({ email, password });

    return response.status(result.status).json(result);
  }
}
