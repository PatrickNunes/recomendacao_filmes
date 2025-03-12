import { Router } from "express";
import { filmesController } from "../controller/filmesController";
import { authController } from "../controller/authController";

const router = Router();

router.get("/",(req,res) => res.redirect("home"));
router.get("/home", filmesController.home);
router.get("/login", authController.login);
router.post("/login",authController.authenticate);

export default router;