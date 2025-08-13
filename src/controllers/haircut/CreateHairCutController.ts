import { Request, Response } from "express";
import { UpdateUserService } from "../../services/users/UpdateUserService";
import { CreateHairCutService } from "../../services/haircut/CreateHairCutService";
import prismaClient from "../../prisma";

class CreateHairCutController {
  async handle(req: Request, res: Response) {
    const { name, price } = req.body;

    const user_id = req.user_id;

    const createHairCutService = new CreateHairCutService();

    const myHairCuts = await prismaClient.haircut.count({
      where: {
        user_id,
      },
    });

    const user = await prismaClient.user.findUnique({
      where: {
        id: user_id,
      },
      include: {
        subscriptions: true,
      },
    });

    if (myHairCuts >= 3 && user?.subscriptions?.status !== "active") {
      throw new Error(
        "You can only create up to 3 haircuts without an active subscription."
      );
    }

    console.log("Quantidade de cortes de cabelo:", myHairCuts);

    const haircut = await createHairCutService.execute({
      user_id,
      name,
      price,
    });

    return res.json(haircut);
  }
}

export { CreateHairCutController };
