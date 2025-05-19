import { Router } from "express";
import { filmesController } from "../controller/filmesController";
import { authController } from "../controller/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", (_, res) => res.redirect("home"));
router.get("/home", authMiddleware, filmesController.home);
router.get("/movie/:id", authMiddleware, filmesController.filme);
router.get("/login", authController.login);
router.post("/login", authController.authenticate);

export default router;