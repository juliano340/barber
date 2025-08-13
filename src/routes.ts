import { Router, Request, Response } from "express";
import CreateUserController from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "API is running!" });
});

router.post("/users", new CreateUserController().handle);
router.post("/auth", new AuthUserController().handle);

export { router };
