import express from "express";
import { config } from "./config/config";
import router from "./routes/router";
import path from "node:path";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(router);

app.listen(config.PORT, () => console.log(`Servidor rodando na porta ${config.PORT}`));