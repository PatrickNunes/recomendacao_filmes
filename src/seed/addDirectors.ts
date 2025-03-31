import { ManagedTransaction } from "neo4j-driver";
import { Movie } from "./movie";

export default async function addDirectors(tx: ManagedTransaction, movie: Movie) {
    if(!movie.directors) return;
    for (const director of movie.directors) {
        await tx.run(
            `MATCH (m:Movie {id: $movieId})
             MERGE (d:Director {name: $name})
             MERGE (d)-[:DIRECTED]->(m)
             RETURN d`,
            { name: director, movieId: movie._id.$oid }
        );
    }
}