import { Request, Response } from "express";

class AuthController {

    public login(req: Request, res: Response) {
        res.render("login", { errorMessage: null });
    }

    public authenticate(req: Request, res: Response) {
        const { email, senha } = req.body;
        if (!email || !senha) {
            res.render("login", { errorMessage: "credenciais inválidas" });
        }

        if(senha != "123"){
            res.render("login", { errorMessage: "credenciais inválidas" });
        }
        res.status(200).redirect("/home");
    }
}

export const authController = new AuthController();