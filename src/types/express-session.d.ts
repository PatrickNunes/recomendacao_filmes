import { Usuario } from "./usuario.type";

declare module "express-session" {
    interface SessionData {
        user?: Usuario;
    }
}