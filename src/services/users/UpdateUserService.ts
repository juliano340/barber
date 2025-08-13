import { PrismaClient } from "../../generated/prisma";
import prismaClient from "../../prisma";

interface UserRequest {
  user_id: string;
  name: string;
  endereco: string;
}

class UpdateUserService {
  async execute({ user_id, name, endereco }: UserRequest) {
    try {
      const userAlreadyExists = await prismaClient.user.findFirst({
        where: {
          id: user_id,
        },
      });

      if (!userAlreadyExists) {
        throw new Error("Usuário não encontrado.");
      }

      const userUpdated = await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          name,
          endereco,
        },
        select: {
          name: true,
          endereco: true,
        },
      });

      if (!userUpdated) {
        throw new Error("Erro ao atualizar usuário.");
      }

      return userUpdated;
    } catch (error) {
      throw new Error("Erro ao atualizar usuário: " + (error as Error).message);
    }
  }
}

export { UpdateUserService };
