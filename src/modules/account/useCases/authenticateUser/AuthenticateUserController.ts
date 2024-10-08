import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { Request, Response } from 'express';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const user = await authenticateUserUseCase.execute({ email, password });

    return response.status(201).json(user);
  }
}

export { AuthenticateUserController };
