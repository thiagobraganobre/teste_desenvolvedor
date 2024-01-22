const express = require('express');
const { Pool } = require('pg');

const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


// Configuração do pool de conexão com o PostgreSQL
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
      'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, telefone]
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


app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});