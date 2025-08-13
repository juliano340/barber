import { Request, Response } from "express";
import { UpdateUserService } from "../../services/users/UpdateUserService";

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const updateUserService = new UpdateUserService();

    const { name, endereco } = request.body;

    const user_id = request.user_id;

    const result = await updateUserService.execute({ user_id, name, endereco });

    return response.json(result);
  }
}
