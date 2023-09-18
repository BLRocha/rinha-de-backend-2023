CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

CREATE TABLE IF NOT EXISTS pessoas (
    id CHAR(36) PRIMARY KEY,
    apelido VARCHAR(32) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    nascimento VARCHAR(32) NOT NULL,
    stack TEXT DEFAULT NULL,
    fullsearch TEXT GENERATED ALWAYS AS (
        LOWER(nome || apelido || stack)
    ) STORED
);

CREATE INDEX IF NOT EXISTS trmgi_person_fullsearch ON pessoas USING GIST (fullsearch gist_trgm_ops (siglen='64'));
-- CREATE INDEX IF NOT EXISTS trmgi_person_fullsearch ON pessoas USING GIN (fullsearch gin_trgm_ops);
