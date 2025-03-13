import session from "express-session";
import { env } from "./env";


export const sessionSetup = session({
    secret: env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        httpOnly:true,
        maxAge: 1000 * 60 * 60 * 24,
    }
})