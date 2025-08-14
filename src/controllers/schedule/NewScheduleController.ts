import { Request, Response } from "express";
import { NewSchedule } from "../../services/schedule/NewSchedule";

class NewScheduleController {
  async handle(req: Request, res: Response) {
    const { haircut_id, customer } = req.body;

    const user_id = req.user_id;

    const newScheduleService = new NewSchedule();

    const schedule = await newScheduleService.execute({
      user_id,
      haircut_id,
      customer,
    });

    return res.json(schedule);
  }
}
export { NewScheduleController };
