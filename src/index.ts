import express from "express";
import { env } from "./config/env";
import router from "./routes/router";
import path from "node:path";
import { sessionSetup } from "./config/session";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(sessionSetup);

app.use(router);

app.listen(env.PORT, () => console.log(`Servidor rodando na porta ${env.PORT}`));