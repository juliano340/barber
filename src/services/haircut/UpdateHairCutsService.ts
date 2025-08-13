import prismaClient from "../../prisma";

interface UpdateHairCutRequest {
  user_id: string;
  haircut_id: string;
  name: string;
  price: number;
  status: boolean | string;
}

class UpdateHairCutsService {
  async execute({
    user_id,
    haircut_id,
    name,
    price,
    status,
  }: UpdateHairCutRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        subscriptions: true,
      },
    });

    if (user?.subscriptions?.status !== "active") {
      throw new Error("User does not have an active subscription");
    }

    const haircut = await prismaClient.haircut.update({
      where: {
        id: haircut_id,
        user_id: user_id,
      },
      data: {
        name,
        price,
        status: status === "true" ? true : false,
      },
    });

    return haircut;
  }
}

export { UpdateHairCutsService };
