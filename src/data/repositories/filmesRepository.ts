import { Movie } from "../../types/movie.type";
import { db } from "../connect";

class FilmesRepository {

    public async getFilmesByUsuario(id: string): Promise<Movie[]> {
        const session = db.session();
        try {
            const result = await session.run(`
                MATCH (u:User)-[:WATCHED]->(m:Movie)
                WHERE elementId(u) = $id
                RETURN m`,
                { id: id });

            const movies: Movie[] = [];

            for (const record of result.records) {
                const props = record.get('m').properties;
                movies.push({
                    id: props.id,
                    fullplot: props.fullplot,
                    plot: props.plot,
                    poster: props.poster,
                    title: props.title,
                    year: props.year,
                })
            }
            return movies;
        } catch (error) {
            console.error(error);
            return [];
        }
        finally {
            await session.close();
        }
    }
    public async getFilmeById(id: string): Promise<Movie | null> {
        const session = db.session();
        try {
            const result = await session.run(`
                MATCH (m:Movie {id: $id}) RETURN m`,
                { id: id });

            if (result.records.length == 0)
                return null;

            const props = result.records[0].get('m').properties;

            return {
                id: props.id,
                fullplot: props.fullplot,
                plot: props.plot,
                poster: props.poster,
                title: props.title,
                year: props.year,
            };
        } catch (error) {
            console.error(error);
            return null;
        }
        finally {
            await session.close();
        }
    }

    public async getFilmesRecomendadosByUsuario(id: string): Promise<Movie[]> {
        const session = db.session();
        try {
            const result = await session.run(`
MATCH (u:User)-[:WATCHED]->(m:Movie)
WHERE elementId(u) = $id

MATCH (m)<-[:DIRECTED]-(d:Director)
MATCH (m)<-[:ACTED_IN]-(a:Actor)
MATCH (m)-[:BELONGS_TO]->(g:Genre)
WITH u, collect(DISTINCT d) AS watchedDirectors,
         collect(DISTINCT a) AS watchedActors,
         collect(DISTINCT g) AS watchedGenres

MATCH (rec:Movie)
WHERE NOT (u)-[:WATCHED]->(rec)

OPTIONAL MATCH (rec)<-[:DIRECTED]-(dRec)
WHERE dRec IN watchedDirectors
OPTIONAL MATCH (rec)<-[:ACTED_IN]-(aRec)
WHERE aRec IN watchedActors
OPTIONAL MATCH (rec)-[:BELONGS_TO]->(gRec)
WHERE gRec IN watchedGenres

WITH rec, COUNT(DISTINCT dRec) AS score_d, COUNT(DISTINCT aRec) AS score_a, COUNT(DISTINCT gRec) AS score_g
WITH rec, (score_d + score_a + score_g) AS totalScore
ORDER BY totalScore DESC
LIMIT 20

RETURN rec {.*, score: totalScore }
                `,
                { id: id });

            const movies: Movie[] = [];

            for (const record of result.records) {
                const props = record.get('rec');
                movies.push({
                    id: props.id,
                    fullplot: props.fullplot,
                    plot: props.plot,
                    poster: props.poster,
                    title: props.title,
                    year: props.year,
                });
            }
            return movies;
        } catch (error) {
            console.error(error);
            return [];
        }
        finally {
            await session.close();
        }
    }
}

export const filmesRepository = new FilmesRepository();