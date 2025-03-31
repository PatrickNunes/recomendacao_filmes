import { ManagedTransaction } from "neo4j-driver";
import { Movie } from "./movie";

export default async function addGenders(tx: ManagedTransaction, movie: Movie) {
    if(!movie.genres) return;
    
    for (const genre of movie.genres) {
        await tx.run(
            `MATCH (m:Movie {id: $movieId})
             MERGE (g:Genre {name: $name})
             MERGE (m)-[:BELONGS_TO]->(g)
             RETURN g`,
            { name: genre, movieId: movie._id.$oid }
        );
    }
} 