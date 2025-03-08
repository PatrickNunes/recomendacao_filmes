import express from "express";
import { config } from "./config/config";
import router from "./routes/router";

const app = express();

app.use(express.json());

app.use(router)

app.listen(config.PORT, () => console.log(`Servidor rodando na porta ${config.PORT}`));