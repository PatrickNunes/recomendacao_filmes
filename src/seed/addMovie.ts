import { ManagedTransaction } from "neo4j-driver";
import { Movie } from "./movie";

export default async function addMovie(tx: ManagedTransaction, movie: Movie) {
    await tx.run(`
        MERGE (m:Movie {id: $id})
         SET m.title = $title, 
             m.plot = $plot,
             m.fullplot = $fullplot,
             m.year = $year, 
             m.poster = $poster
         RETURN m`, {
        id: movie._id.$oid,
        title: movie.title || "",
        plot: movie.plot || "",
        fullplot: movie.fullplot || "",
        year: movie.year || "",
        poster: movie.poster,
    });
}