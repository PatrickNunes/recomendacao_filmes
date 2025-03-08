import { Request, Response } from "express";

class FilmesController {

    public home(req: Request, res: Response) {
        const message = "AAASAS OIOIIOIO";

        res.render("home", { message });
    }
}

export const filmesController = new FilmesController();