import { Request, Response } from "express";

class FilmesController {

    public home(req: Request, res: Response) {
        res.render("home");
    }
}

export const filmesController = new FilmesController();