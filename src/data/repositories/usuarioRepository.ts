import { Usuario } from "../../types/usuario.type";
import { db } from "../connect";

class UsuarioRepository {

    public async login(email: string, senha: string): Promise<Usuario | null> {
        const session = db.session();
        try {
            const result = await session.run(
                `MATCH (u:User {email: $email, senha: $senha}) RETURN u`,
                { email, senha }
            );
            if (result.records.length > 0) {
                const record = result.records[0].get('u') 
                const props = record.properties;
                return {
                    id: record.elementId,
                    email: props.email,
                    nome: props.nome,
                    senha: props.senha
                };
            } else {
                return null;
            }

        } catch (error) {
            console.error(error);
            return null;
        } finally {
            await session.close();
        }
    }
}

export const usuarioRepository = new UsuarioRepository();