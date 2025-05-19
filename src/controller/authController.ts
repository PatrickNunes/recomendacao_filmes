import { usuarioRepository } from './../data/repositories/usuarioRepository';
import { Request, Response } from "express";

class AuthController {

    //private readonly usuarioRepository = usuarioRepository;

    public login(req: Request, res: Response) {
        res.render("login", { errorMessage: null });
    }

    public async authenticate(req: Request, res: Response) {
        const { email, senha } = req.body;
        if (!email || !senha) {
            res.render("login", { errorMessage: "credenciais inválidas" });
        }
        //const usuario = USUARIOS.find(u => u.email === email && u.senha === senha);
        const usuario = await usuarioRepository.login(email, senha);
        if (!usuario) {
            res.render("login", { errorMessage: "credenciais inválidas" });
            return;
        }
        req.session.user = usuario;
        res.status(200).redirect("/home");
    }
}

export const authController = new AuthController();