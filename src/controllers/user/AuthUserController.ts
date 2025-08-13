import { Request, Response } from "express";
import { AuthUserService } from "../../services/users/AuthUserService";

class AuthUserController {
  async handle(request: Request, response: Response) {
    const authUserService = new AuthUserService();

    const { email, password } = request.body;

    const result = await authUserService.execute({ email, password });

    return response.json(result);
  }
}

export { AuthUserController };
