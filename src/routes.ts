import { Router, Request, Response } from "express";
import CreateUserController from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticate } from "./middlewares/isAuthenticate";
import { UpdateUserController } from "./controllers/user/UptadeUserController";
import { CreateHairCutController } from "./controllers/haircut/CreateHairCutController";
import { ListHairCutController } from "./controllers/haircut/ListHairCutController";
import { UpdateHairCutController } from "./controllers/haircut/UpdateHairCutController";
import { CheckSubscriptionController } from "./controllers/haircut/CheckSubscriptionController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "API is running!" });
});

router.post("/users", new CreateUserController().handle);
router.post("/auth", new AuthUserController().handle);
router.get("/me", isAuthenticate, new DetailUserController().handle);
router.put("/users", isAuthenticate, new UpdateUserController().handle);
router.post("/haircuts", isAuthenticate, new CreateHairCutController().handle);
router.get("/haircuts", isAuthenticate, new ListHairCutController().handle);
router.put("/haircuts", isAuthenticate, new UpdateHairCutController().handle);
router.get(
  "/haircuts/check",
  isAuthenticate,
  new CheckSubscriptionController().handle
);

export { router };
