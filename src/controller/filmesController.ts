import { filmesRepository } from './../data/repositories/filmesRepository';
import { Request, Response } from "express";

class FilmesController {

    private readonly filmesRepository = filmesRepository;
    public async home(req: Request, res: Response) {
        const userId = req.session.user!.id;
        const movies = await filmesRepository.getFilmesByUsuario(userId);
        const recMovies = await filmesRepository.getFilmesRecomendadosByUsuario(userId);
        res.render("home", { movies, recMovies });
    }

    public async filme(req: Request, res: Response) {
        const movieId = req.params.id;
        const movie = await filmesController.filmesRepository.getFilmeById(movieId);
        res.render("movie", { movie });
    }
}

export const filmesController = new FilmesController();