import { Request, Response } from "express";
import { DetailHairCutService } from "../../services/haircut/DetailHairCutService";

class DetailHaircutController {
  async handle(req: Request, res: Response) {
    const haircut_id = req.query.haircut_id as string;

    const detailHairCutService = new DetailHairCutService();

    try {
      const haircut = await detailHairCutService.execute({ haircut_id });
      return res.json(haircut);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      return res.status(400).json({ error: message });
    }
  }
}

export { DetailHaircutController };
