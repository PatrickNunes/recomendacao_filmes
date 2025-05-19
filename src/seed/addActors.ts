import { ManagedTransaction } from "neo4j-driver";
import { Movie } from "./movie";

export default async function addActors(tx: ManagedTransaction, movie: Movie) {
    if(!movie.cast) return;
    for (const actor of movie.cast) {
        await tx.run(
            `MATCH (m:Movie {id: $movieId})
             MERGE (a:Actor {name: $name})
             MERGE (a)-[:ACTED_IN]->(m)
             RETURN a`,
            { name: actor, movieId: movie._id.$oid }
        );
    }
}