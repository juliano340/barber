import { Request, Response } from "express";
import { UpdateHairCutsService } from "../../services/haircut/UpdateHairCutsService";

class UpdateHairCutController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const { name, price, status, haircut_id } = req.body;

    const updateHairCutsService = new UpdateHairCutsService();

    const haircut = await updateHairCutsService.execute({
      user_id,
      haircut_id,
      name,
      price,
      status,
    });

    return res.json(haircut);
  }
}

export { UpdateHairCutController };
