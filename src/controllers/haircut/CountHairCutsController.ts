import { Request, Response } from "express";
import { CountHairCutsService } from "../../services/haircut/CountHairCutsService";

class CountHairCutController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const countHairCutsService = new CountHairCutsService();

    try {
      const count = await countHairCutsService.execute({ user_id });
      return res.json({ count });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      return res.status(400).json({ error: message });
    }
  }
}

export { CountHairCutController };
