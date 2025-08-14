import prismaClient from "../../prisma";

interface ListScheduleRequest {
  user_id: string;
}

class ListScheduleService {
  async execute({ user_id }: ListScheduleRequest) {
    const listSchedule = await prismaClient.service.findMany({
      where: {
        user_id: user_id,
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        haircut: true,
        customer: true,
      },
    });

    return listSchedule;
  }
}

export { ListScheduleService };
