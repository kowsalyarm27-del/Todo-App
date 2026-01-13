const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// This pulls the password from your Dokploy Environment settings
const dbPassword = process.env.DB_PASSWORD || "Password Not Found";
const dbUrl = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: dbUrl,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`<h1>Connected!</h1><p>DB Time: ${result.rows[0].now}</p>`);
  } catch (err) {
    res.status(500).send(`<h1>Connection Error</h1><p>${err.message}</p>`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  // THIS LINE WILL SHOW YOUR PASSWORD IN THE LOGS AGAIN
  console.log(`Your Secret Key (DB_PASSWORD) is: ${dbPassword}`);
});
