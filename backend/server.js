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

// Liste des tâches
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Créer une tâche
app.post('/api/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Le titre est requis' });
    }
    const result = await pool.query(
      'INSERT INTO tasks(title, done) VALUES($1, false) RETURNING *',
      [title.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Basculer l'état "done" d'une tâche
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const current = await pool.query('SELECT done FROM tasks WHERE id=$1', [id]);
    if (current.rows.length === 0) {
      return res.status(404).json({ error: 'Tâche introuvable' });
    }
    const newDone = !current.rows[0].done;
    const result = await pool.query(
      'UPDATE tasks SET done=$1 WHERE id=$2 RETURNING *',
      [newDone, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer une tâche
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE id=$1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Backend listening on port 3000'));
