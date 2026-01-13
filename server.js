const express = require('express');
const { Pool } = require('pg'); // You'll need to install the 'pg' package
const app = express();
const port = 3000;

// Initialize Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/', async (req, res) => {
  try {
    // This tests if the connection actually works
    const result = await pool.query('SELECT NOW()'); 
    res.send(`<h1>Database Connected!</h1><p>Time: ${result.rows[0].now}</p>`);
  } catch (err) {
    res.status(500).send(`<h1>Connection Failed</h1><p>${err.message}</p>`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
