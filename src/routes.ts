import { Router, Request, Response } from "express";
import CreateUserController from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticate } from "./middlewares/isAuthenticate";
import { UpdateUserController } from "./controllers/user/UptadeUserController";
import { CreateHairCutController } from "./controllers/haircut/CreateHairCutController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "API is running!" });
});

router.post("/users", new CreateUserController().handle);
router.post("/auth", new AuthUserController().handle);
router.get("/me", isAuthenticate, new DetailUserController().handle);
router.put("/users", isAuthenticate, new UpdateUserController().handle);
router.post("/haircuts", isAuthenticate, new CreateHairCutController().handle);

export { router };
