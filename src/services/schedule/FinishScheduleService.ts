import prismaClient from "../../prisma";

interface FinishScheduleRequest {
  schedule_id: string;
  user_id: string;
}

class FinishScheduleService {
  async execute({ schedule_id, user_id }: FinishScheduleRequest) {
    if (schedule_id === "" || user_id === "") {
      throw new Error("ID do agendamento ou do usuário inválido");
    }

    try {
      const belongsToUser = await prismaClient.service.findFirst({
        where: {
          id: schedule_id,
          user_id: user_id,
        },
      });

      if (!belongsToUser) {
        throw new Error("Not authorized");
      }

      await prismaClient.service.delete({
        where: {
          id: schedule_id,
        },
      });

      return { message: "Agendamento concluido com sucesso" };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
}

export { FinishScheduleService };
