import { Request, Response } from "express";
import { ListHairCutService } from "../../services/haircut/ListHairCutService";

class ListHairCutController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const status = req.query.status as string;

    const listHairCutService = new ListHairCutService();

    const hairCuts = await listHairCutService.execute({
      user_id,
      status,
    });

    return res.json(hairCuts);
  }
}

export { ListHairCutController };
