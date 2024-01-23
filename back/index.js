const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


// Configuração do pool de conexão com o PostgreSQL
//por se tratar de um teste deixei as configurações por aqui mesmo
const pool = new Pool({
  user: 'docker',
  host: 'postgres',
  database: 'docker',
  password: 'docker',
  port: 5432,
});

app.use(express.json());

// Endpoint para cadastrar cliente
app.post('/cadastrar', async (req, res) => {
  try {
    const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
    const result = await pool.query(
      'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y,localizacao) VALUES ($1, $2, $3, $4, $5, ST_MakePoint($4, $5)) RETURNING *',
      [nome, email, telefone, coordenada_x, coordenada_y]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Endpoint para listar clientes
app.get('/listar', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});



//calcula as rotas de visitação otimizadas utilziando o postgis
//aproveitando um recurso GIS já existente
app.get('/calcular-rota', async (req, res) => {
  try {
    const result = await pool.query(`SELECT id,nome, email, telefone,
        ST_Distance(
            ST_Transform(localizacao, 32633),  
            -- Transforma para um sistema de coordenadas que utiliza metros
            ST_Transform(ST_SetSRID(ST_MakePoint(${process.env.EMPRESA_COORDENADA_X}, ${process.env.EMPRESA_COORDENADA_Y}), 4326), 32633)
        ) AS distancia
    FROM clientes
    ORDER BY distancia;`);
    res.status(200).json(result.rows);

  } catch (error) {
    console.error('Erro ao calcular rota otimizada:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});