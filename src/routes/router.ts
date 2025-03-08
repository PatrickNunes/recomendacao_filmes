import { Router } from "express";
import { filmesController } from "../controller/filmesController";

const router = Router();

router.get("/home", filmesController.home);

export default router;