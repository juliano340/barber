import { Request, Response } from "express";
import CreateUserService from "../../services/users/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const createUserService = new CreateUserService();

    const { name, email, password } = request.body;

    const result = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.json(result);
  }
}

export default CreateUserController;
