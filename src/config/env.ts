import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default("3000").transform(Number),
    SESSION_SECRET: z.string(),
    DB_URL: z.string(),
    DB_USER: z.string(),
    DB_PASS: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("Erro na configuração das variáveis de ambiente:", parsedEnv.error.format());
    process.exit(1);
}

export const env = parsedEnv.data;