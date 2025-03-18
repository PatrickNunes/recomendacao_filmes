import neo4j, { Driver, Session } from 'neo4j-driver';
import { env } from '../config/env';

type ConnectionInfo = {
    url: string,
    user: string,
    pass: string,
}

class Neo4jConnection {
    private static instance: Neo4jConnection | null = null;
    private readonly driver: Driver;

    constructor(conn: ConnectionInfo) {
        this.driver = neo4j.driver(conn.url, neo4j.auth.basic(conn.user, conn.pass));
        this.testConnection().then(result => {
            if (result) {
                process.on('SIGINT', async () => {
                    console.log('Encerrando conexão com Neo4j...');
                    await this.closeConnection();
                    process.exit(0);
                });
                process.on('SIGTERM', async () => {
                    console.log('Recebido SIGTERM, fechando conexão...');
                    await this.closeConnection();
                    process.exit(0);
                });
            }
        });
    }

    private async testConnection(): Promise<boolean> {
        const session = this.driver.session();
        try {
            const result = await session.run("RETURN 'Conexão bem-sucedida!' AS message");
            console.log(result.records[0].get("message"));
            return true;
        } catch (error) {
            console.error("Erro ao conectar ao Neo4j:", error);
            return false;
        } finally {
            await session.close();
        }
    }

    public static getInstance(): Neo4jConnection {
        if (!this.instance) {
            this.instance = new Neo4jConnection({
                url: env.DB_URL,
                user: env.DB_USER,
                pass: env.DB_PASS,
            });
        }
        return this.instance;
    }

    public session(): Session {
        return this.driver.session();
    }

    public async closeConnection() {
        await this.driver.close();
        Neo4jConnection.instance = null;
    }
}

const conn: ConnectionInfo = {
    url: env.DB_URL,
    user: env.DB_USER,
    pass: env.DB_PASS
}

export const db = Neo4jConnection.getInstance();