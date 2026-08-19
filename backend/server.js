const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
app.use(cors());
app.use(express.json());
const pool = new Pool({
  host: process.env.DB_HOST || 'database',
  user: process.env.DB_USER || 'smarttask',
  password: process.env.DB_PASSWORD || 'smarttask_pwd',
  database: process.env.DB_NAME || 'smarttaskdb',
  port: 5432,
});
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;
  const result = await pool.query('INSERT INTO tasks(title, done) VALUES($1, false) RETURNING *', [title]);
  res.status(201).json(result.rows[0]);
});
app.listen(3000, () => console.log('Backend listening on port 3000'));
