import { Pool } from 'pg';

const pool = new Pool({
    host: 'postgres',
    user: 'postgres',
    password: '123',
    database: 'bun',
    max: 500,
    //idleTimeoutMillis: 0,
    connectionTimeoutMillis: 10000,
});

export const insertPessoa = async (id: string, apelido: string, nome: string, nascimento: string, stack: string | null ) => {
  const query = `INSERT INTO pessoas (
      id, apelido, nome, nascimento, stack
    ) VALUES (
    $1, $2, $3, $4, $5
    )`;
  return pool.query(query, [id, apelido, nome, nascimento, stack]);
}

export const findById = async (id: string) => {
  const query = `SELECT
      id, apelido, nome, nascimento,stack
    FROM pessoas
    WHERE id = $1
    `;
  return pool.query(query, [id]);
}

export const findByTermo = async (termo: string) => {
  const query = `
    SELECT
        id,
        apelido,
        nome,
        nascimento,
        stack
    FROM pessoas
    WHERE fullsearch ILIKE $1
    LIMIT 50`;
    return pool.query(query, [`%${termo}%`]);
}

export const count = async () => pool
  .query(`SELECT COUNT(1) FROM pessoas`);