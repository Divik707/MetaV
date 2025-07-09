import { Router } from "express";
import { login, register } from "../controllers/authController";
import { getAvatar, getElements } from "../controllers/avatar.elementController";

const router: Router = Router();

router.use("/auth", register);
router.use("/auth", login);
router.use("/auth", getElements);
router.use("/auth", getAvatar);

export default router;