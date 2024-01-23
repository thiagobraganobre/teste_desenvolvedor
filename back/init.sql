CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20)
);

ALTER TABLE clientes ADD COLUMN coordenada_x DOUBLE PRECISION;
ALTER TABLE clientes ADD COLUMN coordenada_y DOUBLE PRECISION;

ALTER TABLE clientes ADD COLUMN localizacao GEOMETRY(Point, 4326);
