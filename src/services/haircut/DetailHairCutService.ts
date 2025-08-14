import prismaClient from "../../prisma";

interface DetailHairCutRequest {
  haircut_id: string;
}

class DetailHairCutService {
  async execute({ haircut_id }: DetailHairCutRequest) {
    const haircut = await prismaClient.haircut.findFirst({
      where: {
        id: haircut_id,
      },
    });

    return haircut;
  }
}

export { DetailHairCutService };
