import fs from 'fs/promises';
import path from 'path';
import { Movie } from './movie';
import { db } from '../data/connect';
import { Session } from 'neo4j-driver';
import addMovie from './addMovie';
import addDirectors from './addDirectors';
import addGenders from './addGenders';
import addActors from './addActors';
import { faker } from '@faker-js/faker';
import { exit } from 'process';
import { Usuario } from '../types/usuario.type';
import addUser from './addUser';

// (:User)-[:WATCHED]->(:Movie) → Usuários que assistiram ao filme.
// (:Movie)-[:BELONGS_TO]->(:Genre) → Gêneros do filme.
// (:Movie)-[:DIRECTED_BY]->(:Director) → Diretores do filme.
// (:Movie)<-[:ACTED_IN]-(:Actor) → Atores que participaram do filme.

const readJsonFile = async (): Promise<Movie[]> => {
    try {
        const data = await fs.readFile(path.join(__dirname, 'movies.json'), 'utf-8');
        const movies = JSON.parse(data) as Movie[];

        return movies;
    } catch (error) {
        console.error("Erro ao ler o arquivo:", error);
        return [];
    }
}

const addMovies = async (session: Session) => {
    const movies = await readJsonFile();
    if (movies.length == 0) {
        return;
    }
    for (const movie of movies) {
        if (!movie.poster) continue;
        console.log(movie._id.$oid);
        await session.executeWrite(async (tx) => {
            await addMovie(tx, movie);
            await addDirectors(tx, movie);
            await addActors(tx, movie);
            await addGenders(tx, movie);
        });
    }
}

const addUsers = async (session: Session) => {
    for (let i = 0; i < 100; i++) {
        const name = faker.person.firstName();
        const email = `${name.toLowerCase()}@email.com`;
        const user: Usuario = {
            id: 0,
            email: email,
            nome: name,
            senha: '123'
        }
        await session.executeWrite(async (tx) => {
            await addUser(tx, user);
            console.log("user " + i);
        });
    }
}

const session = db.session();

//addMovies(session).then(() => session.close());
addUsers(session).then(() => {
    session.close();
    exit(0);
});

