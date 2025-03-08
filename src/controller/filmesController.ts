import { Request, Response } from "express";

class FilmesController {

    public home(req: Request, res: Response) {
        res.send("Hello Home");
    }
}

export const filmesController = new FilmesController();