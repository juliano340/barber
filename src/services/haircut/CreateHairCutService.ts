import prismaClient from "../../prisma";

interface HairCutRequest {
  user_id: string;
  name: string;
  price: number;
}

class CreateHairCutService {
  async execute({ user_id, name, price }: HairCutRequest) {
    if (!name || !price) {
      throw new Error("Corte e preço são obrigatórios.");
    }

    const haircut = await prismaClient.haircut.create({
      data: {
        name,
        price,
        user_id,
      },
    });

    return haircut;
  }
}

export { CreateHairCutService };
