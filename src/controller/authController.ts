import { Request, Response } from "express";
import { USUARIOS } from "../config/users";

class AuthController {

    public login(req: Request, res: Response) {
        res.render("login", { errorMessage: null });
    }

    public authenticate(req: Request, res: Response) {
        const { email, senha } = req.body;
        if (!email || !senha) {
            res.render("login", { errorMessage: "credenciais inválidas" });
        }
        const usuario = USUARIOS.find(u => u.email === email && u.senha === senha);
        if(!usuario){
            res.render("login", { errorMessage: "credenciais inválidas" });
            return;
        }

        req.session.user = usuario;
        res.status(200).redirect("/home");
    }
}

export const authController = new AuthController();