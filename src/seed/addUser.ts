import { ManagedTransaction } from "neo4j-driver";
import { Usuario } from "../types/usuario.type";

export default async function addUser(tx: ManagedTransaction, user: Usuario) {
    await tx.run(
        `MERGE (u:User { email: $email })
                ON CREATE SET u.senha = $senha, u.nome = $nome
             WITH u
             MATCH (m:Movie)
             WITH u, m ORDER BY rand()
             LIMIT 20
             MERGE (u)-[:WATCHED]->(m)
             RETURN u, collect(m) AS filmes`,
        { email: user.email, senha: user.senha, nome: user.nome }
    );
}